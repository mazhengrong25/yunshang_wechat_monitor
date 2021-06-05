<!--
 * @Description: 聊天对话
 * @Author: mzr
 * @Date: 2021-05-27 13:59:10
 * @LastEditTime: 2021-06-04 14:38:58
 * @LastEditors: mzr
-->
<template>
  <div class="dialogue_content">
        <!-- <div class="content_date">
            <div class="date_item">2021-3-29 16:20</div>
        </div> -->
        <div v-for="(item, index) in recordList" :key="index" :class="item.type === 1?'left_message':'right_message'">
            <!-- 发送方 蓝色-->
            <div v-if="item.type === 2" class="sender_dialog_item">
                <div class="sender_item_right">

                    <p>{{item.name}} {{item.contentTime}}</p>
                    <div :class="item.contentType === 'emotion' || item.contentType === 'image' ?'sender_right_bubble not_background':'sender_right_bubble'">
                        <div class="withdraw" v-if="item.contentType === 'revoke'">此消息已撤回</div>
                        <ForwardChat v-if="item.contentType === 'mixed'" :dialogList="item"></ForwardChat>

                        <el-image 
                            :z-index="2500" 
                            v-else-if="item.contentType === 'image' || item.contentType === 'emotion'" 
                            fit="contain" 
                            :src="$imgUrl + JSON.parse(item.content).resourcePath" 
                            :style="item.contentType === 'emotion' ? `max-width:${JSON.parse(item.content).width}px;max-height:${JSON.parse(item.content).height}px`:''" 
                            :preview-src-list="[$imgUrl + JSON.parse(item.content).resourcePath]"></el-image>

                        <div v-else>{{item.content}}</div>

                    </div>

                </div>
                <div class="sender_item_pic">
                    <img v-if="item.photoUrl" :src="item.photoUrl" />
                    <img v-else :src="require('@/static/group_avatar.png')" alt="本地图片" /> 
                    <!-- <div v-else class="not_img"><i class="element-icons el-icontupian1"></i></div> -->
                </div>
            </div>
            <!-- 接收方 -->
            <div v-else class="dialog_item">
                <div class="item_pic">
                    <img v-if="item.photoUrl" :src="item.photoUrl" />
                    <img v-else :src="require('@/static/group_avatar.png')" alt="本地图片" /> 
                    <!-- <div v-else class="not_img"><i class="element-icons el-icontupian1"></i></div> -->
                </div>
                <div class="item_right">
                    <p>{{item.contentTime}} {{item.name}}</p>

                    <div :class="item.contentType === 'emotion' || item.contentType === 'image' ?'right_bubble not_background':'right_bubble'">

                        <ForwardChat v-if="item.contentType === 'mixed'" :dialogList="item"></ForwardChat>

                        <el-image 
                            :z-index="2500" 
                            v-else-if="item.contentType === 'image' || item.contentType === 'emotion'" 
                            fit="contain" 
                            :src="$imgUrl + JSON.parse(item.content).resourcePath" 
                            :style="item.contentType === 'emotion' ? `max-width:${JSON.parse(item.content).width}px;max-height:${JSON.parse(item.content).height}px`:''" 
                            :preview-src-list="[$imgUrl + JSON.parse(item.content).resourcePath]"></el-image>

                        <div v-else>{{item.content}}</div>
                        <div class="withdraw" v-if="item.contentType === 'revoke'">此消息已撤回</div>
                    </div>
                </div>
            </div>

        </div>
  </div>
</template>

<script>
export default {
    components: {
        ForwardChat: () => import("./forwardChat"),   // 转发对话框
    },
    props: {
        // 聊天对话列表
        recordList: {
            type: Array,
            default: () => []
        },
       
    },
    data() {
        return {
            
        }
    },
    methods: {

    },
}
</script>

<style lang="less" scoped>
.dialogue_content {
    // .content_date {
    //     display: flex;
    //     justify-content: center;
    //     margin-top: 15px;
    //     .date_item {
    //         color: darkgray;
    //         font-size: 10px;
    //         background-color: lightgray;
    //         padding: 2px 5px;
    //     }
    // }
    .left_message {
        .dialog_item {
            padding: 15px;
            .item_pic {
                vertical-align: top;
                display: inline-block;
                width: 45px;
                height: 45px;
                background-color: lightgray;
                margin: 21px 10px 0px 0px;
                img {
                    // width: 100%;
                    height: 100%;
                    object-fit: contain;
                }
                .not_img {
                    width: 100%;
                    height: 100%;
                    line-height: 45px;
                    text-align: center;
                }
            }
            .item_right {
                display: inline-block;
                width: calc(100% - 55px);
                p {
                    color: lightgrey;
                    font-size: 10px;
                    margin-bottom: 5px;
                }
                .right_bubble {
                    border-radius: 0px 20px 20px 20px;
                    background-color: lightgray;
                    padding: 13px 25px;
                    font-size: 14px;
                    min-width: 60px;
                    max-width: 40%;
                    word-wrap: break-word;
                    word-break: break-all;
                    display: inline-block;
                    min-height: 39px;
                    position: relative;
                    &.not_background {
                        background-color: transparent;
                    }
                    .withdraw {
                        position: absolute;
                        color: red;
                        font-size: 12px;
                        background-color: rgba(red, 0.1);
                        padding: 5px;
                        width: 85px;
                        text-align: center;
                        left: calc(100% + 20px);
                        top: 50%;
                        margin-top:-13px;
                    }
                }
            }
        }
    }
    .right_message {
        text-align: right;
        .sender_dialog_item {
            padding: 15px;
            .sender_item_pic {
                vertical-align: top;
                display: inline-block;
                width: 45px;
                height: 45px;
                background-color: lightgray;
                margin: 21px 0px 0px 10px;
                img {
                    // width: 100%;
                    height: 100%;
                    object-fit: contain;
                }
                .not_img {
                    width: 100%;
                    height: 100%;
                    text-align: center;
                    line-height: 45px;
                }
            }
            .sender_item_right {
                display: inline-block;
                width: calc(100% - 55px);

                p {
                    color: lightgrey;
                    font-size: 10px;
                    margin-bottom: 5px;
                }
                .sender_right_bubble {
                    display: inline-block;
                    border-radius: 20px 0px 20px 20px;
                    background-color: #0070e2;
                    color: #fff;
                    font-size: 14px;
                    padding: 13px 25px;
                    min-width: 60px;
                    max-width: 40%;
                    min-height: 39px;
                    word-wrap: break-word;
                    word-break: break-all;
                    margin-left: auto;
                    text-align: left;
                    position: relative;

                    &.not_background {
                        background-color: transparent;
                    }
                    .withdraw {
                        position: absolute;
                        color: red;
                        font-size: 12px;
                        background-color: rgba(red, 0.1);
                        padding: 5px;
                        width: 85px;
                        text-align: center;
                        right: calc(100% + 20px);
                        top:50%;
                        margin-top: -13px;
                    }
                }
            }
        }
    }
}
</style>