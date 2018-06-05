// ==UserScript==
// @name         GoRPGPlus
// @namespace    http://www.gorpg.club/
// @version      0.1
// @description  修改GoRPG
// @author       SettingDust
// @match        http*://www.gorpg.club/*
// @require      https://code.jquery.com/jquery-latest.js
// @require      https://cdn.bootcss.com/scrollify/1.0.19/jquery.scrollify.min.js
// @grant        none
// ==/UserScript==

(() => {
    'use strict';
    let head = $("head");
    let body = $("body");

    head.append('<link href="' +
        'https://cdn.bootcss.com/material-design-icons/3.0.1/iconfont/material-icons.min.css" rel="stylesheet">');

    let pageRender = () => {
        pageRender.header = () => {
            //Base
            {
                addCss(`
                input {
                  border-radius: 2px;
                  padding: 6px 7px;
                }
                .focus {
                  bottom: auto;
                  right: auto;
                }
                .paddingtopmax {
                  padding: 120px 48px;
                }
                .c_ontainer {
                  width: auto;
                }`, "Base");
            }
            //Nav
            {
                addCss(`
                #header .logo {
                  background-position: center;
                  background-size: 78px 33px;
                  width: 78px;
                  height: 64px;
                  margin-right: 24px;
                }
                #header {
                  height: 64px;
                  background: #232323;
                  text-shadow: none;
                }
                #header .c_ontainer {
                  padding-left: 24px;
                  padding-right: 24px;
                  width: auto;
                  height: 64px;
                  display: flex;
                  align-items: center;
                  transition: 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
                }
                #header .discover, .aandq {
                  float: none;
                  margin-left: 4px;
                  margin-right: 4px;
                  transition: 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
                  border-radius: 2px;
                }
                #header .s_tri a {
                  padding: 4px 16px;
                }
                #header .s_tri:hover a {
                  color: #fff;
                }
                #header .discover.open, .aandq:hover, #header .discover.open, .aandq.a {
                  background-color:rgba(13,137,239,0.12);
                }
                #header .whitespace {
                  flex: 1 1 auto;
                }
                #header .c_ontainer .r_box {
                  position: relative;
                  background: transparent;
                }`, "Nav");
            }
            let whitespace = $("<div/>");
            whitespace.addClass("whitespace");
            $("#header .c_ontainer .r_box").before(whitespace);
        };

        pageRender.portal = () => {
            //Nav
            {
                addCss(`
                #header {
                  box-shadow: none;
                }`, "Nav");
            }
            //Content
            {
                addCss(`
                .st6 {
                  margin: 0;
                  display: flex;
                  justify-content: center;
                  padding: 64px 48px;
                }
                .static,.static_black {
                  margin-top: 64px;
                }
                .c_ontainer {
                  width: 1200px;
                  margin: 0;
                }
                `, "Content");
            }
            pageRender.portal.top = () => {
                //Top
                {
                    addCss(`
                    #ph_top {
                      background-size: cover;
                      width: auto;
                      background-attachment: fixed;
                      height: 100vh;
                    }`, "Top");
                }
                let top_background = $("#ph_top .head_bg .bg_one");
                $("#ph_top").css("background-image", top_background.css("background-image"));
                top_background.parent().remove();
                $(".fill_bg").remove();

                pageRender.portal.top.search = () => {
                    //Search
                    {
                        addCss(`
                            .st_search {
                              position: relative;
                              width: auto;
                              padding: 24px 0;
                              margin: 0;
                              top: 26vh;
                            }
                            .st_search p {
                              font-size: 18px;
                              font-weight: 700;
                            }
                            .st_search h1 {
                              font-weight: 700;
                            }
                            .st_search .search_wrap {
                              border-radius: 2px;
                              box-shadow: 0 2px 2px 0 rgba(0,0,0,0.32), 0 0 0 1px rgba(0,0,0,0.16);
                              display: flex;
                              padding: 0;
                              height: auto;
                              transition: 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
                              background: transparent;
                            }
                            .st_search .search_wrap input {
                              padding: 12px 16px;
                              font-size: 18px;
                              color: #fff;
                              background: transparent;
                              transition: 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
                              text-shadow: 0 0 5px rgba(0,0,0,0.32);
                            }
                            .st_search .search_wrap input:focus {
                              color: rgba(0,0,0,0.87);
                              text-shadow: none;
                            }
                            .st_search .search_wrap:hover,
                            .st_search .search_wrap.focus {
                              box-shadow: 0 4px 8px 0 rgba(0,0,0,0.32), 0 0 0 2px rgba(0,0,0,0.16);
                            }
                            .st_search .search_wrap.focus {
                              background: #fff;
                            }`,
                            "Search");
                    }
                    let search_wrap = $(".search_wrap");
                    let search_wrap_input = $("<input\>");
                    search_wrap.children().remove();
                    search_wrap.append(search_wrap_input);
                    search_wrap_input.blur(() => {
                        search_wrap.removeClass("focus");
                    });
                    search_wrap_input.focus(() => {
                        search_wrap.addClass("focus");
                    });
                    search_wrap_input.keypress(function (e) {
                        if (e.keyCode === 13) {
                            search(search_wrap_input.val());
                        }
                    });
                    search_wrap_input.focus();
                };
                pageRender.portal.top.search();
            };
            pageRender.portal.top();
        };

        pageRender.header();
        if (location.href.indexOf("/portal.php") !== -1) {
            pageRender.portal();
        }
    };

    pageRender();

    /**
     * 添加style到head
     * @param css css内容
     * @param name style标识
     */
    function addCss(css, name) {
        let style = body.find("style[data-meta='" + name + "']:first");
        if (style.length === 0) {
            style = $("<style\>");
        }
        style.text(style.text() + css);
        style.attr("data-meta", name);
        body.append(style);
    }
})();