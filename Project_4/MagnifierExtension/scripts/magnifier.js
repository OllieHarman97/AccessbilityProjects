$(document).ready(function (){

    //alert("!!ATTENTION!! \n\nMy keyboard doesn't work in a way that I can press + without pressing shift =, which means I can't press specifically shift + because I would need to press shift = and then shift again, which I cannot do. So instead I used . and , for Browser Zoom and shift = (which is my +) and shift - for Graphical Zoom, I hope that is okay");

    var zoomLevel = 1;
    document.body.style.zoom = zoomLevel;
    var shiftClicked;
    var spaceClicked;

    //This is to detect whether shift has been clicked or not so that I can detect when equals is pressed
    //This is because + doesn't seem to have a keyCode strangely, so this is my workaround
    document.addEventListener('keydown', function(e){
        if (e.code == "ShiftLeft" || e.code == "ShiftRight"){
            shiftClicked = true;
        }
    });

    document.addEventListener('keyup',function(e){
        if (e.code == "ShiftLeft" || e.code == "ShiftRight"){
            shiftClicked = false;
        }
    })

    //Event handler for when = or - is hit with shift
    document.addEventListener('keydown', function(e){
        if (e.code == "Period"){
            zoomLevel = zoomLevel + 0.1;
            document.body.style.zoom = zoomLevel;
        }

        if(e.code == "Comma"){
            zoomLevel = zoomLevel - 0.1;
            if (zoomLevel < 0.1){
                console.log("setting zoom to 0 not allowed");
                zoomLevel = 0.1;
            }
            else{
                document.body.style.zoom = zoomLevel;
            }
        }
    });


    
    document.addEventListener('keydown', function(e){
        if (e.code == "Equal"){
            if(shiftClicked){
                zoomLevel = zoomLevel + 0.1;
                let scaleString = 'scale(' + zoomLevel + ')';
                $('body').css('transform-origin', 'left top');
                $('body').css('transform',  scaleString);
            }
        }

        if (e.code == "Minus"){
            if (shiftClicked){
                zoomLevel = zoomLevel - 0.1;
                let scaleString = 'scale(' + zoomLevel + ')';
                $('body').css('transform',  scaleString);
                $('body').css('left',  '0px');
            }
        }
    });

    document.addEventListener('mousemove', function(e){
        var documentWidth = $(document).width(); //z
        var windowWidth = $(window).width(); //y
        var windowScroll = $(window).scrollLeft(); //b
        var windowTop = $(window).scrollTop();
        var xOffset = e.pageX - windowScroll; //a

        if (documentWidth > windowWidth){
            if(xOffset < 100){
                //scrollLeft
                console.log("gets here");
                window.scrollTo({top: windowTop, left: windowScroll-100,behavior: 'smooth'});
            }

            if(windowWidth-xOffset < 100){
                //scrollRight
                console.log("gets here");
                $('body').animate({scrollLeft: '-=460'},1000);
                window.scrollTo({top: windowTop, left: windowScroll+100 ,behavior: 'smooth'});
            }
        }
    })


    document.addEventListener('keydown', function(e){
        if(e.code == 'Space'){

            $('body').append($('<div class=\'mydiv\'></div>'));
            if(spaceClicked){
                $(".mydiv").remove();
                $(this).unbind('mouseenter mouseleave')
                spaceClicked = false;
            }

            else{
                spaceClicked = true;
                $("*:not(body)").hover(

                    function (ev) {
                        if($('.mydiv').children().length > 0){
                            console.log("moused over div");
                        }
                        else{
                            $('.mydiv').append($(this).clone());
                        }
                    },

                    function (ev) {
                        console.log("moused Off");
                    },
                    
                )
            }
        }
    })

})