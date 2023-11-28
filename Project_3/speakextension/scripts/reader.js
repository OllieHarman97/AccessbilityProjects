
$(document).ready(function () {
    //remove all highlights initially
    $(".highlight").removeClass('highlight')
    
    document.addEventListener('keydown', function (e) { 
        if (e.code == `` || e.code == `Unidentified` || e.code == `Space`) {

            //If space is pressed turn on hover logic
            $("*:not(body)").hover(
                
                //run the onEnter logic
                function (ev) {
                    var alttext = $(this).attr("alt") 
                    var srcofimg = $(this).attr("src")

                    $(this).addClass("highlight")
                    ev.stopPropagation()

                    //if alttext is not undefined and then it is longer than 0 characters
                    if (alttext !== undefined && alttext.length > 0) {
                        console.log("image with alt text hovered over"); 
                        speechSynthesis.speak(new SpeechSynthesisUtterance(alttext)) 
                    }

                    //if no alttext and there is a srcofimg then print img url
                    else if (srcofimg !== undefined){ 
                        console.log("image with no alt text but src hovered over");
                        speechSynthesis.speak(new SpeechSynthesisUtterance(srcofimg))
                    }

                    //else read the text
                    else {
                        console.log("text hovered over");
                        speechSynthesis.speak(new SpeechSynthesisUtterance($(this).text()));
                    }   
                }, 
            
                //once unhovered then stop talking and remove highlight
                function (ev) {
                    $(this).removeClass("highlight")
                    speechSynthesis.cancel();  
                } 
            ) 
        }

        //turn off mouseenter mouseleave so that it disables the hover logic
        else {
            $(this).off('mouseenter mouseleave');
            $(".highlight").removeClass("highlight")
            speechSynthesis.cancel(); 
        } 
    })
})