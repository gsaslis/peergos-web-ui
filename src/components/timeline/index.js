module.exports = {
    template: require('timeline.html'),
    data: function() {
        return {
            showSpinner: false,
            data: [],
            pageEndIndex : 0,
            pageSize: 20,
            requestingMoreResults: false,
            noMoreResults: false,
            showSocialPostForm: false,
            socialPostAction: '',
            currentSocialPostTriple: null
        }
    },
    props: ['context','navigateToAction','viewAction', 'messages', 'getFileIconFromFileAndType', 'socialFeed',
        'importCalendarFile', 'importSharedCalendar', 'displayProfile', 'groups'],
    created: function() {
        let that = this;
        Vue.nextTick(function() {
            that.init();
            //TODO size scroll display area using css!
            let scrollingArea = document.getElementById('scroll-area');
            var rect = scrollingArea.getBoundingClientRect();
            scrollingArea.style["height"] = (window.innerHeight - rect.top) /10 * 9 + "px";
            let body = document.getElementsByTagName('body');
            body[0].onresize = function(){
                var rect = scrollingArea.getBoundingClientRect();
                var height = (window.innerHeight - rect.top);
                scrollingArea.style["height"] = height/10 * 9+ "px";
            };

        });
    },
    methods: {
        addNewPost: function() {
            this.socialPostAction = 'add';
            this.showSocialPostForm = true;
        },
        closeSocialPostForm: function(currentSocialPostTriple) {
            this.currentSocialPostTriple = currentSocialPostTriple;
            this.showSocialPostForm = false;
            //todo reload
        },
        editPost: function(entry) {
            this.socialPostAction = 'edit';
            //temp
            if (entry != null) {
                this.currentSocialPostTriple = {left: entry.link + "/" + entry.name, middle: entry.socialPost, right: entry.file};
            }
            this.showSocialPostForm = true;
        },
        deletePost: function(entry) {
            let that = this;
            that.showSpinner = true;
            let filePath = this.currentSocialPostTriple.left;
            let file = this.currentSocialPostTriple.right;
            let parentPath = peergos.client.PathUtils.getParent(filePath);
            this.context.getByPath(parentPath.toString()).thenApply(function(optParent){
                file.remove(optParent.get(), filePath, that.context).thenApply(function(b){
                    that.showSpinner = false;
                    that.currentSocialPostTriple = null;
                    //todo reload
                }).exceptionally(function(throwable) {
                    that.showMessage("error deleting post");
                    that.showSpinner = false;
                });
            }).exceptionally(function(throwable) {
                that.showMessage("error retrieving post");
                that.showSpinner = false;
            });
        },
        getGroupUid: function(groupName) {
            return this.groups.groupsNameToUid[groupName];
        },
        addComment: function(entry) {
            let that = this;
            let comment = new peergos.shared.social.SocialPost.Ref(entry.link, entry.cap);
            console.log("not implemented!");
            //this.currentSocialPostTriple = {left: entry.link + "/" + entry.name, middle: entry.socialPost, right: entry.file};
        },
        addReplyToComment: function(entry) {
            let that = this;
            console.log("not implemented!");
            /*
            let groupUid = that.getGroupUid(peergos.shared.user.SocialState.FRIENDS_GROUP_NAME);
            let originalPost = entry.socialPost;
            let post = originalPost.addComment(comment, groupUid);
            this.savePost(post);
            */
        },
        getFileSize: function(props) {
                var low = props.sizeLow();
                if (low < 0) low = low + Math.pow(2, 32);
                return low + (props.sizeHigh() * Math.pow(2, 32));
        },
        loadPost: function(entry, future) {
            let that = this;
            const props = entry.right.getFileProperties();
            entry.right.getInputStream(this.context.network, this.context.crypto, props.sizeHigh(), props.sizeLow(), function(read){})
                .thenApply(function(reader) {
                    var size = that.getFileSize(props);
                    var data = convertToByteArray(new Int8Array(size));
                    reader.readIntoArray(data, 0, data.length).thenApply(function(read){
                        let socialPost = peergos.shared.util.Serialize.parse(data, c => peergos.shared.social.SocialPost.fromCbor(c));
                        future.complete(socialPost);
                    });
            }).exceptionally(function(throwable) {
                that.showMessage("error loading post");
                future.complete(null);
            });
        },
        loadFile: function(entry) {
            let future = peergos.shared.util.Futures.incomplete();
            let isPost = entry.left.path.startsWith("/" + entry.left.owner + "/.posts/");
            if (isPost) {
                this.loadPost(entry, future);
            } else {
                future.complete(null);
            }
            return future;
        },
        reduceLoadingAllFiles: function(pairs, index, accumulator, future) {
            let that = this;
            if (index == pairs.length) {
                future.complete(accumulator);
            } else {
                let currentPair = pairs[index];
                that.loadFile(currentPair).thenApply(contents => {
                    that.reduceLoadingAllFiles(pairs, ++index,
                        accumulator.concat({left: currentPair.left, middle: contents, right: currentPair.right}),
                        future);
                })
            }
        },
        loadFiles: function(pairs) {
            let future = peergos.shared.util.Futures.incomplete();
            this.reduceLoadingAllFiles(pairs, 0, [], future);
            return future;
        },
        handleScrolling: function() {
            let that = this;
            let scrollingDiv = document.getElementById('scroll-area');
            if (scrollingDiv.offsetHeight + scrollingDiv.scrollTop >= scrollingDiv.scrollHeight) {
                that.requestMoreResults();
            }
        },
        processItems: function(items) {
            var that = this;
            var ctx = this.context;
            let allTimelineEntries = [];
            ctx.getFiles(peergos.client.JsUtil.asList(items)).thenApply(function(pairs) {
                let allPairs = pairs.toArray();
                that.loadFiles(allPairs).thenApply(function(triples) {
                    let numberOfEntries = triples.length;
                    for(var j = 0; j < numberOfEntries; j++) {
                        let triple = triples[j];
                        let timelineEntry = that.createTimelineEntry(triple.left, triple.middle, triple.right);
                        if (timelineEntry != null) {
                            allTimelineEntries.push(timelineEntry);
                        }
                    }
                    that.data = that.data.concat(allTimelineEntries);
                    that.showSpinner = false;
                    that.requestingMoreResults = false;
                });
            }).exceptionally(function(throwable) {
                that.showMessage(throwable.getMessage());
                that.showSpinner = false;
                that.requestingMoreResults = false;
            });
        },
        filterSharedItems: function(items) {
            let filteredSharedItems = [];
            for(var i=0; i < items.length; i++) {
                let currentSharedItem = items[i];
                if (!currentSharedItem.path.startsWith("/" + currentSharedItem.owner + "/.profile/")
                    && !currentSharedItem.path.startsWith("/" + currentSharedItem.owner + "/shared/.")) { //groups
                    filteredSharedItems.push(currentSharedItem);
                }
            }
            return filteredSharedItems;
        },
        requestMoreResults: function() {
            let that = this;
            if (that.noMoreResults || that.requestingMoreResults) {
                return;
            }
            that.showSpinner = true;
            that.requestingMoreResults = true;
            let startIndex = Math.max(0, this.pageEndIndex - this.pageSize);
            this.retrieveResults(startIndex, this.pageEndIndex).thenApply(function(additionalItems) {
               that.pageEndIndex = that.pageEndIndex - additionalItems.length;
               let items = that.filterSharedItems(additionalItems.reverse());
               if (items.length == 0) {
                    that.showSpinner = false;
                    that.requestingMoreResults = false;
                    that.noMoreResults = true;
                    that.data = that.data.concat({isLastEntry: true});
               } else {
                    that.processItems(items);
               }
            }).exceptionally(function(throwable) {
                that.showMessage(throwable.getMessage());
                that.showSpinner = false;
                that.requestingMoreResults = false;
            });
        },
        showMessage: function(title, body) {
            this.messages.push({
                title: title,
                body: body,
                show: true
            });
        },
        navigateTo: function (entry) {
            this.close();
            this.navigateToAction(entry.path);
        },
        view: function (entry) {
            var filename = entry.file.getName();
            if (this.isSharedCalendar(entry.path)) {
                this.importSharedCalendar(entry.path, entry.file, false, entry.file.getOwnerName());
            } else {
                var mimeType = entry.file.getFileProperties().mimeType;
                console.log("Opening " + mimeType);
                if (mimeType === "text/calendar") {
                    this.importCalendarFile(false, entry.file);
                } else {
                    if (entry.isDirectory) {
                        this.navigateToAction(entry.path);
                        this.close();
                    } else {
                        this.viewAction(entry.path, entry.fullName);
                    }
                }
            }
        },
        profile: function(username) {
            this.displayProfile(username, false);
        },
        isSharedCalendar: function(path) {
            let pathParts = path.split("/");
            return pathParts.length == 6 && pathParts[0] == '' &&
                pathParts[2] == '.apps' &&
                pathParts[3] == 'calendar' &&
                pathParts[4] == 'data';
        },
        createTimelineEntry: function(entry, socialPost, file) {
            let info = " shared";
            var displayFilename = true;
            if(entry.cap.isWritable() ) {
                info = info + " write access to";
            }
            let props = file.props;
            var isSharedCalendar = false;
            if (props.isHidden) {
                if (this.isSharedCalendar(entry.path)) {
                    isSharedCalendar = true;
                } else {
                    return null;
                }
            }
            if (props.isDirectory) {
                if (isSharedCalendar) {
                    info = info + " a calendar"; // - " + props.name;
                    displayFilename = false;
                } else {
                    info = info + " the folder";
                }
            } else if (props.getType() == 'calendar') {
                info = info + " a calendar event";
                displayFilename = false;
            } else {
                info = info + " the file";
            }
            if (entry.sharer != entry.owner) {
                info = info + " owned by " + entry.owner;
            }
            info = info + ": ";
            let path = props.isDirectory ? entry.path : entry.path.substring(0, entry.path.lastIndexOf(props.name) -1);
            let name = props.name.length > 30 ? props.name.substring(0,27) + '...' : props.name;
            let fileType = isSharedCalendar ? 'calendar' : props.getType();
            let isPost = socialPost != null;
            if (isPost) {
                info = "sent a message at " + socialPost.postTime.toString().replace('T',' '); + ":";
                name = socialPost.body;
            }
            let item = {
                sharer: entry.sharer,
                info: info,
                link: entry.path,
                cap: entry.cap,
                path: path,
                name: name,
                fullName: props.name,
                hasThumbnail: props.thumbnail.ref != null,
                thumbnail: props.thumbnail.ref == null ? null : file.getBase64Thumbnail(),
                isDirectory: props.isDirectory,
                file: file,
                isLastEntry: false,
                displayFilename: displayFilename,
                fileType: fileType,
                isPost: isPost,
                socialPost: socialPost
            };
            return item;
        },
        getFileIconClass: function(file) {
            return this.getFileIcon(file);
        },
	    retrieveUnSeen: function(startIndex, requestSize, results) {
	        var future = peergos.shared.util.Futures.incomplete();
	        this.retrieveUnSeenWithFuture(startIndex, requestSize, results, future);
	        return future;
        },
	    retrieveUnSeenWithFuture: function(startIndex, requestSize, results, future) {
	        if (! this.socialFeed.hasUnseen() ) {
	            future.complete(results);
	        } else {
                var ctx = this.context;
                let that = this;
                this.socialFeed.getShared(startIndex, startIndex + requestSize, ctx.crypto, ctx.network).thenApply(function(items) {
                    let allEntries = items.toArray();
                    let newIndex = startIndex + allEntries.length;
                    that.socialFeed.setLastSeenIndex(newIndex).thenApply(function(res) {
                        that.retrieveUnSeenWithFuture(newIndex, requestSize, results.concat(allEntries), future);
                    }).exceptionally(function(throwable) {
                        that.showMessage(throwable.getMessage());
                        that.showSpinner = false;
                    });
                }).exceptionally(function(throwable) {
                    that.showMessage(throwable.getMessage());
                    that.showSpinner = false;
                });
            }
            return future;
        },
	    retrieveResults: function(startIndex, endIndex) {
	        var future = peergos.shared.util.Futures.incomplete();
	        if(startIndex < 0 || startIndex >= endIndex) {
    	        future.complete([]);
	            return future;
	        }
            var ctx = this.context;
            this.socialFeed.getShared(startIndex, endIndex, ctx.crypto, ctx.network).thenApply(function(items) {
                future.complete(items.toArray());
            }).exceptionally(function(throwable) {
                that.showMessage(throwable.getMessage());
                that.showSpinner = false;
            });
            return future;
	    },
	    init: function() {
            var that = this;
            that.showSpinner = true;
            var ctx = this.context;
            this.pageEndIndex = this.socialFeed.getLastSeenIndex();
            this.retrieveUnSeen(this.pageEndIndex, this.pageSize, []).thenApply(function(unseenItems) {
                let startIndex = Math.max(0, that.pageEndIndex - that.pageSize);
                that.retrieveResults(startIndex, that.pageEndIndex, []).thenApply(function(additionalItems) {
                    that.pageEndIndex = that.pageEndIndex - additionalItems.length;
                    let allTimelineEntries = [];
                    let items = that.filterSharedItems(unseenItems.reverse().concat(additionalItems.reverse()));
                    var numberOfEntries = items.length;
                    if (numberOfEntries == 0) {
                        that.data = allTimelineEntries;
                        that.showSpinner = false;
                    } else {
                        ctx.getFiles(peergos.client.JsUtil.asList(items)).thenApply(function(pairs) {
                            let allPairs = pairs.toArray();
                            that.loadFiles(allPairs).thenApply(function(triples) {
                                numberOfEntries = triples.length;
                                for(var j = 0; j < numberOfEntries; j++) {
                                    let triple = triples[j];
                                    let timelineEntry = that.createTimelineEntry(triple.left, triple.middle, triple.right);
                                    if (timelineEntry != null) {
                                        allTimelineEntries.push(timelineEntry);
                                    }
                                }
                                that.data = allTimelineEntries;
                                that.showSpinner = false;
                            });
                        }).exceptionally(function(throwable) {
                            that.showMessage(throwable.getMessage());
                            that.showSpinner = false;
                        });
                    }
                }).exceptionally(function(throwable) {
                    that.showMessage(throwable.getMessage());
                    that.showSpinner = false;
                });
            }).exceptionally(function(throwable) {
                that.showMessage(throwable.getMessage());
                that.showSpinner = false;
            });
        },
        close: function () {
            this.$emit("hide-timeline");
        }
    }
}
