#好吧，我知道你来看这个文章，一定是遇到坑了,所以，把这几个放在最开始吧
>Vue问题，你可以在Vue官方提交issues，[【地址】](https://github.com/vuejs/vue/issues?spm=a219a.7629140.0.0.kh5Vra) 。
Weex问题，你可以在中文讨论板块提交问题，[【地址】](https://segmentfault.com/t/weex?spm=a219a.7629140.0.0.kh5Vra) 。
weex支持有限的Style，页面的布局使用Flex，建议仔细阅读：[Weex 组件支持的通用样式规则](https://weex.apache.org/cn/references/common-style.html)
weex的上层业务框架有三层：vue2.0，rax，we，如果你用vue2.0来编写上层业务，建议仔细阅读：[Vue 2.x 在 Weex 和 Web 中的差异](https://weex.apache.org/cn/references/vue/difference-with-web.html) 和 [Vue 官方文档](https://cn.vuejs.org/)
内建组件和内建模块基本上是你开发Weex应用的基础，建议仔细阅读：[内建模块](https://weex.apache.org/cn/references/modules/index.html) 和 [内建组件](https://weex.apache.org/cn/references/components/index.html)
weex debug 的使用方式，建议仔细阅读：[weex dev tool 的使用](https://github.com/weexteam/weex-devtool)
###常用社区与资源
3个比较活跃的Weex开发QQ群 327169027  112304356  140596030
[Weex学院](http://www.weexdaxue.com/)
[Weex中文社区](http://www.weex.help/)
[一个weex的UI组件库](https://github.com/erguotou520/weex-uikit)
[一个weex答题牛人，荔枝我大哥](https://segmentfault.com/u/lizhiwodage/answers?sort=vote)
[Weex的github地址](https://github.com/apache/incubator-weex/)

#首先，你肯定想知道Weex是个什么玩意
来给你甩个链接，来看看官方如何解释weex是个啥[Weex官方地址](http://weex.apache.org/cn/guide/)
具体的搭建环境什么的里面都有，可以直接阅读官方文档，但是官方文档有坑，请酌情阅读
###有以下知识需要注意
1. Weex现在支持用Vue2.0语法进行开发，所以你现在需要先具备一定的Vue基础，关于Vue的相关知识，请参考[Vue官方文档](https://cn.vuejs.org/v2/guide/)，Weex官方说是Vue的全家桶都能够使用，但是在实际开发过程中，我们团队还是遇到了一定的问题，3端表现并不一致，请斟酌使用。如果你有原生开发经验，那就太好了。
  > ###### 非常重要,一定要仔细阅读  [Vue 2.x 在 Weex 和 Web 中的差异](http://weex.apache.org/cn/references/vue/difference-with-web.html)

2. 在样式上，Weex对CSS的支持不是特别完善
>  Weex不支持CSS的简写，所有类似margin: 0 0 10px 10px的都是不支持的
不管是Web还是Weex你的设计应该基于750px来绘制界面，Weex框架层面会帮你自动计算和适配。

3. ######调试
>如果你对Native比较熟悉可以直接编一下weex开源的项目，如果实在搞不明白的话，你可以去各大应用市场里下载 weex playground 这个App，然后用weex debug src/weex-bootstrap.we 来开启调试界面。
>如果你只想查看一下在Native端的渲染，用weex playground这个App扫描一下第二个二维码即可。
如果你需要调试，依然是用weex playground这个App先扫描第一个二维码，此时会出现第二个节目，然后再扫描下方，你自己页面的二维码来渲染。
调试分为两个部分Debugger和Inspector，如果你选择Debugger，那么你可以在source里看到你写的文件，来断点之类的。如果你选择后者，那么你可以在element面板里查看元素。
>重要的事情再说一遍：（要用weex playground扫二维码）。

# 推荐阅读 前人留下的印迹

> * 钉钉官方人员，基于Weex的钉钉高性能微应用倡导者与实践者，写的相关文章    请仔细阅读  [地球上最全的weex踩坑攻略-出自大量实践与沉淀](http://www.jianshu.com/p/740431068ff5)

***

> * 关于字体图标的解决办法，字体图标需要处理后才能正常使用 [字体图标的Bug](https://segmentfault.com/q/1010000009357817)
`<text :style="{fontFamily:'iconfont',color:'red',fontSize:'40px'}">{{getFontName}}</text>`
`<script>`
   `var he = require('he');
    module.exports = {
    data: function () {`
        return {
          fontName: '',
        }
    `},`
    `computed: {`
        getFontName: function() {
            return he.decode(this.fontName)
        }
    `}`
  `}`
`</script>`

***
> * 一个可爱的萌妹子的探路历程[比较详细的Weex踩坑过程](https://segmentfault.com/a/1190000007560611)
连载教程[进击的weex 第二发 weex的各种坑](https://segmentfault.com/a/1190000008726288)

***

> * 目前所知的，比较倾向于原生的踩坑历程[最早的踩坑历程](http://www.jianshu.com/p/497f1a9ff33f)

***
> * 基本的Weex介绍视频 ，钉钉研发人员开讲[ 快到让你难以置信的Weex技术](http://mudu.tv/watch/971571)

***
> * 强烈推荐的钉钉封的一个js库，非常好用，这个库存在的意义是提供一些便捷的Utility函数，这些Utility函数将抹平Web Weex之间的一些差异，提供统一的接口，让用户使用，目前实现了7个模块可供使用。[抹平差异的Utility库](https://open-doc.dingtalk.com/docs/doc.htm?spm=a219a.7629140.0.0.w1LNib&treeId=357&articleId=106828&docType=1)

***
> * 钉钉给出的[常见小问题](https://open-doc.dingtalk.com/docs/doc.htm?spm=a219a.7629140.0.0.uJGDBf&treeId=357&articleId=106770&docType=1)

***
> * Weex相关的视频，但是Weex1.0版本的，可以学习思想  [暴走亲年的weex教学视频](http://i.youku.com/i/UNDEzMDY2NjI0MA==/videos)

***
> * weex-hackernews项目源码，Weex官方给的一个Demo [https://github.com/weexteam/weex-hackernews](https://github.com/weexteam/weex-hackernews)

***
> * 我是从这个Demo上手的，基于Vue2.0 强烈推荐，强烈推荐，强烈推荐  ，Android可直接打包为apk，无须配置[一个老外写的todo-list Demo](https://github.com/tralves/weex-todo-list)

***



##通往星辰大海的路上的坑（下面想起什么记录什么，无序排列，持续更新）

>   *  ####关于fetch(options, callback[,progressCallback])[发起网络请求](http://weex.apache.org/cn/references/modules/stream.html#参数)中有关Timeout的问题
当你在请求数据时，可能会发现官方的文档里没有设置 timeout 这个属性，官方大概把这个属性值设置为了3秒，在弱网情况下，这个值是不够的。经过研究，其实，你可以大胆使用，如下：
```
stream.fetch({
    method: 'GET',
    type: 'json',
    url: 'https://api.github.com/repos/' + repo,
    timeout:6000  //单位为ms
}, callback)
```
***
 * ####使用Weex中的refresh，loading上拉与下拉刷新，3端体验不一致，Android上拉下拉都没问题，iOS都不行
原因是因为在iOS 上由于 Scroller 的contentSize 小于scroller 本身高度所以导致不能滑动，所以需要设置你想滑动的内容或容器高度
（建议同loadmore事件替换loading组件，loading的问题有点多，即使你的content足够长，高度大于屏幕高度，多拽几次也有可能出现加载中...情况收不下去的）
***
* ####目前图片不支持使用本地图片，并且不支持gif格式，如果需要类似loading的动图，可以尝试使用动画实现 
*** 
 * ####可以考虑用来做loading动画[持续旋转的动画效果](http://dotwe.org/vue/77b7adb5cfe402842c2ee2cf1b9df195)
Tips:   transform: 'rotateZ(360deg)', 其中你旋转的角度每次动画过后都是保存了的，并没有归0,也就是说你第一次是从0度转到360度，以后（你的每600ms）都是从360度到360度。
***
* ####文字展现必须使用<text>标签















#以上全部资源来自互联网搜集，欢迎转发分享，希望Weex能越来越好。