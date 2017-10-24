最简单节流
            let timer = null;
            function openUrl(url) {
              timer && clearTimeout(timer);
              timer = setTimeout(function () {
                //do somethings 
              }, 300);
            }
