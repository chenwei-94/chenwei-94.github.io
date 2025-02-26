# Hugo添加APlayer


### hugo 添加APlayer播放器

- 先新建一个aplayer.html，原理是利用了hugo的自定义模板
  
  你需要在你的hugo项目下的layouts\shortcodes目录中下新建一个HTML网页作为组件。
  
  如下 aplayer.html  ，未来在文章中就可以引用了，用短代码的方式 。

```text
hugo-root
├── layouts
│   ├── shortcodes
│   │ ├── aplayer.html
├── static
├── themes
└── hugo.toml
```

### 在新建的aplayer.html文件中添加以下内容

```html
&lt;!-- aplayer.html --&gt;
&lt;link rel=&#34;stylesheet&#34; href=&#34;https://cdn.jsdelivr.net/npm/aplayer/dist/APlayer.min.css&#34;&gt;
&lt;script src=&#34;https://cdn.jsdelivr.net/npm/aplayer/dist/APlayer.min.js&#34;&gt;&lt;/script&gt;

{{/* 生成唯一ID（兼容Hugo旧版本） */}}
{{- $uniqueID := printf &#34;aplayer-%d&#34; .Ordinal -}}

&lt;!-- 播放器容器 --&gt;
&lt;div id=&#34;{{ $uniqueID }}&#34; class=&#34;aplayer&#34;&gt;&lt;/div&gt;

&lt;script&gt;
    document.addEventListener(&#39;DOMContentLoaded&#39;, () =&gt; {
        new APlayer({
            container: document.getElementById(&#39;{{ $uniqueID }}&#39;),
            audio: [{
                name: &#39;{{ .Get &#34;name&#34; | default &#34;未知&#34; }}&#39;,
                artist: &#39;{{ .Get &#34;artist&#34; | default &#34;blog.cwgzs.top&#34; }}&#39;,
                url: &#39;{{ .Get &#34;url&#34; | default &#34;/audio/default.mp3&#34; }}&#39;,
                cover: &#39;{{ .Get &#34;cover&#34; | default &#34;/img/default-cover.jpg&#34; }}&#39;,
                lrc: &#39;{{ .Get &#34;lrc&#34; }}&#39;
            }],
            lrcType: 3
        });
    });
&lt;/script&gt;
```

### 剩下的就在文章里面引用就可以了

##### 代码还要加上两个大括号{{ }}，&lt; aplayer&gt; 方括号里面的内容还要放进{{ }}里面

```html
{ {&lt; aplayer
    url=&#34;/music/song1.mp3&#34;
    name=&#34;Song One&#34;
    artist=&#34;Artist A&#34;
    cover=&#34;/img/cover1.jpg&#34;
    &gt;}}
{ { &lt;aplayer
    url=&#34;/music/song2.mp3&#34;
    name=&#34;Song Two&#34;
    artist=&#34;Artist B&#34;
&gt;}}
```

```
可选参数  name  artist url cover lrc

- name       歌曲名
- artist     歌手
- url        歌曲地址
- cover      播放封面
- lrc        歌词地址
```


---

> 作者: [陈伟](https://blog.cwgzs.top)  
> URL: https://blog.cwgzs.top/posts/hugo%E6%B7%BB%E5%8A%A0aplayer/  

