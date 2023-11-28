$(document).ready(function (){

    var keyboard = document.createElement("div");
    var xBar = document.createElement("div");
    var yBar = document.createElement("div");
    var scrollButton = document.createElement("div");
    var scrollText = document.createTextNode("This is the scroll feature, use scan lines on text field to bring up keyboard (that's how I understood the question)");
    scrollButton.appendChild(scrollText);

    scrollButton.className = "scrollButton";
    xBar.className = "scanBarX";
    yBar.className = "scanBarY";
    keyboard.className = "keyboard1";

    document.body.appendChild(keyboard);
    document.body.appendChild(scrollButton);
    document.body.appendChild(xBar);
    document.body.appendChild(yBar);

    var lastTextClicked;
    var currentText = "";
    var CapsLock = false;

    document.addEventListener('keydown', (e) => {  
        if (e.code == 'Space' && e.target == document.body) {
            e.preventDefault();  
        }  
    });

    $(".keyboard1").load("https://sarahmorrisonsmith.com/accessibility/keyboard.html");

    $(".scrollButton").click(function(){
        $('html, body').animate({
            scrollTop: $(document).scrollTop()+150
           }, 500,'linear');
    });

    function simulateClick(element) {

        if (!element){
            console.log("not an element");
            return;
        }

        var event1 = new MouseEvent("mouseover", {
            bubbles: true,
            cancelable: true
        });

        var event2 = new MouseEvent("mousedown", {
            bubbles: true,
            cancelable: true
        });

        var event3 = new MouseEvent("click", {
            bubbles: true,
            cancelable: true
        });

        var event4 = new MouseEvent("mouseup", {
            bubbles: true,
            cancelable: true
        });

        element.dispatchEvent(event1);
        element.dispatchEvent(event2);
        element.dispatchEvent(event3);
        element.dispatchEvent(event4);
    };

    setInterval(function() {
        paint();
    }, 200);

    var state = "none"; // horizontal_scanning, vertical_scanning

    function paint() {
        if(state == "horizontal_scanning") {
            // update position of your horizontal scan bar
            $(".scanBarX").animate({left: '+=100px'}, 1000, 'linear');
        } else if(state == "vertical_scanning") {
            // update position of your vertical scan bar
            $(".scanBarY").animate({top: '+=100px'}, 1000, 'linear');
        } else {
            // do nothing
        }
    };

    document.addEventListener('keydown', function(e){

        if(e.code == "Space") {
            // update state here, given current state
            if(state == "none"){
                $("html, body").stop(true);
                $(".scanBarX").css("display","flex");
                state = "horizontal_scanning";
            }
            else if(state == "horizontal_scanning"){
                $(".scanBarY").css("display","flex");
                $("div").stop(true);
                state = "vertical_scanning";
            }
            else if(state == "vertical_scanning"){
                $("div").stop(true);

                var xCoordOfViewPort = $(document).scrollLeft();
                var yCoordOfViewPort = $(document).scrollTop();
                var xCoord = $(".scanBarX").css("left");
                var yCoord = $(".scanBarY").css("top");

                console.log(parseInt(xCoord));
                console.log(parseInt(yCoord));

                var elementToClick = document.elementFromPoint(parseInt(xCoord), parseInt(yCoord));

                simulateClick(elementToClick);

                if($(elementToClick).is("input[type=\'text\'],textarea")){
                    $(".keyboard1").css("display","flex");
                    lastTextClicked = elementToClick;
                    console.log(lastTextClicked);
                }
                else if ($(elementToClick).parent().is(".keyboard")){
                    $(".keyboard1").css("display","flex");
                    var letter = $(elementToClick).text();
                    var trimmedLetter = $.trim(letter);
                    console.log(trimmedLetter);

                    if(trimmedLetter == "CapsLock"){
                        if(CapsLock){
                            CapsLock = false;
                        }
                        else{
                            CapsLock = true;
                        }
                        trimmedLetter="";
                    }
                    else if(trimmedLetter == "Tab"){
                        trimmedLetter = "    ";
                    }
                    else if(trimmedLetter == "Backspace"){
                        trimmedLetter = "";
                        currentText = currentText.slice(0,-1); 
                    }

                    if(!CapsLock){
                        trimmedLetter = trimmedLetter.toLowerCase();
                    }

                    newValue = currentText + trimmedLetter;
                    currentText = newValue;
                    
                    $(lastTextClicked).val(newValue).trigger("change");
                }
                else{
                    console.log("doesn't do this");
                    $(".keyboard1").css("display","none");
                }

                $(".scanBarX").css("display","none");
                $(".scanBarY").css("display","none");
                $(".scanBarX").css("left","0");
                $(".scanBarX").css("top","0");
                $(".scanBarY").css("left","0");
                $(".scanBarY").css("top","0");
                state = "none";
            }

            e.stopPropagation();
        }
    });

})