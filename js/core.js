$(document).ready(function(){

        // ---- menu ------------------------------------------
  
        var initial = true;

var createMenu = function(k){

        var menuItem = function (pic, display) 
         {
            var _this = this; 
            _this.pic = pic;
            };

            var picArray = [
                '',
                'resources/pictures/bold-text.svg',
                'resources/pictures/underline.svg',
                'resources/pictures/italics.svg',
                'resources/pictures/H1.svg',
                'resources/pictures/remove.svg',
                'resources/pictures/undo.svg',
                'resources/pictures/redo.svg', 
                'resources/pictures/link.svg',
                'resources/pictures/superscript.svg',
                'resources/pictures/subscript.svg',
                'resources/pictures/color-text.svg',
                'resources/pictures/highlight.svg',
                'resources/pictures/H3.svg',
                'resources/pictures/increase_font.svg',
                'resources/pictures/decrease_font.svg',
                'resources/pictures/text-in.svg',
                'resources/pictures/text-out.svg',
                'resources/pictures/insert-picture.svg',
                'resources/pictures/orderedlist.svg',
                'resources/pictures/unordered.svg',
                'resources/pictures/left.svg',
                'resources/pictures/right.svg',
                'resources/pictures/center.svg',
                'resources/pictures/block.svg',
                'resources/pictures/save.svg'];

            var menulist = $('<ul>'), menuArray = [];

            for (var j=0; j < k; j++) {                
                var newMenuEntry = new menuItem(picArray[j]);
                menuArray.push(newMenuEntry);
            }

            for (let i = 0; i < k; i++) 
               { 
                var cssObj = {backgroundImage:'url("' + menuArray[i].pic + '")', 'height':'2em', 'width':'2em'}
                if(i > 8) {cssObj.display = 'none';}
                menulist
                .append($('<li>')
                .css(cssObj)
                .attr('id', 'li'+i)
                )};              

            if(initial === true){                   
                $(menulist).appendTo('#menu');
                initial = false;
            }
            else {
                $(menulist).append('#menu'); 

            };

            // special treatment of sidemenu - disable draggin of sidemenu and button animation
            $('#li0').addClass('disabled hamburger hamburger--slider').append('<div class="hamburger-box"><div class="hamburger-inner"></div></div>');                                         
            
            $('#menu ul')                           //sortable function of jquery ui
            .sortable({appendTo: '#menu',
            containment: 'parent',
            cursor: "move",
            delay: 250,
            items: 'li:not(.disabled)',
            placeholder: "sortable-placeholder",
            revert: 'true',
         
                });
            }

            createMenu(26);
           


/* ------------------------------story ----------------------*/
  var oStory = function(name, story)
  {
      this.name = name;
      this.story = story;
  };

var currentStoryID;
var aStory = [];

var storyselector = function(){

       for (var i=0; i < localStorage.length; i++ ) {
          aStory.push(JSON.parse(localStorage[i]));
        }        
            aStory.push({name:'+', story:''});

            for (var j = aStory.length - 1; j >= 0; j--) 
            {
            $('#storywrapper').append('<div class="storypreview" id="storyprev'+j+'">');
            $('#storyprev'+j).append('<h1  class="center_align">'+aStory[j].name+'</h1>').fadeIn()
            $('#storyprev'+j).append('<p>'+aStory[j].story.substr(0,200)+'</p>').fadeIn();
            }
             
         $('.storypreview').on('click', function()   
         {
             currentStoryID = $(this).attr('id').slice(9);
            
            if (currentStoryID === (aStory.length - 1).toString())
            {   
                var newStory = new oStory('<h1 class="center_align">your Title</h1>', '<p>write something or not... i dont care</p>');
                aStory.push(newStory);
                $('#storytitle').html(newStory.name);
                console.log(newStory.name)
                $('#storycontent').html(newStory.story);
                $('#storyselector').fadeOut();
            } else 
            {
                $('#storytitle').html(aStory[currentStoryID].name);
                $('#storycontent').html(aStory[currentStoryID].story);
                $('#storyselector').fadeOut();
            }
        });
 

    };                    

 storyselector();

//--------------------------- storyselector ende


 
  $('#storycontent').on('keyup click touchend touchstart vmouseup vclick tap', function(e){
                var story = $('#storycontent').html()
                var name = $('#storytitle').html()
                var currentstory = new oStory(name, story)                

                localStorage.setItem(currentStoryID, JSON.stringify(currentstory));

                var an = document.getSelection().anchorNode
                var parentObj = $(an).parentsUntil('#storycontent');

                $('#menu ul li').removeClass('btnhighlight');

                for (var i = 0; i < (Object.keys(parentObj).length - 2); i++)
                {
                    switch (parentObj[i].tagName.toLowerCase()) {
                        case 'b': $('#li1').addClass('btnhighlight'); break;
                        case 'u': $('#li2').addClass('btnhighlight'); break;
                        case 'h1': $('#li4').addClass('btnhighlight'); break;
                        case 'i': $('#li3').addClass('btnhighlight'); break;
                        case 'sup': $('#li9').addClass('btnhighlight'); break;
                        case 'sub': $('#li10').addClass('btnhighlight'); break;
                        case 'h3': $('#li13').addClass('btnhighlight'); break;
                        case 'ol': $('#li19').addClass('btnhighlight'); break;
                        case 'ul': $('#li20').addClass('btnhighlight'); break;
                    }
                }
                });

//------------------------------------------button actions -------------------------------------------------

var aColors = [
        ["#000","#444","#666","#999","#ccc","#eee","#f3f3f3","#fff"],
        ["#f00","#f90","#ff0","#0f0","#0ff","#00f","#90f","#f0f"],
        ["#f4cccc","#fce5cd","#fff2cc","#d9ead3","#d0e0e3","#cfe2f3","#d9d2e9","#ead1dc"],
        ["#ea9999","#f9cb9c","#ffe599","#b6d7a8","#a2c4c9","#9fc5e8","#b4a7d6","#d5a6bd"],
        ["#e06666","#f6b26b","#ffd966","#93c47d","#76a5af","#6fa8dc","#8e7cc3","#c27ba0"],
        ["#c00","#e69138","#f1c232","#6aa84f","#45818e","#3d85c6","#674ea7","#a64d79"],
        ["#900","#b45f06","#bf9000","#38761d","#134f5c","#0b5394","#351c75","#741b47"],
        ["#600","#783f04","#7f6000","#274e13","#0c343d","#073763","#20124d","#4c1130"]
    ];
     var menuheight = $('#menu ul').height();

        
    
    $('#li0').on('click', function(){               // expanding menu toggles and displays menu items
        var hidelist2 = [];

      
        $('#menu ul li').each(function()
        {
            if ($(this).offset().top > 90)              //hides every li which is more than 90 from top
            {
                var id = $(this).attr('id');
                hidelist2.push(id);
            }
        });


        if ($('#menu ul').hasClass('expanded'))                          
            {    
                for (var i=0; i < hidelist2.length; i++)                    
                {
                    /*$(hidelist[i]).hide();*/
                    document.getElementById(hidelist2[i]).style.display = 'none';                     
                }             
                $(this).removeClass('is-active');
                $('#menu ul').animate({height:menuheight},200);
                $('#storytitle').animate({'margin-top':0},200);
                $('#menu ul').removeClass('expanded');
            }

        else 
            {
                $(this).addClass('is-active');
                $('#menu ul').addClass('expanded');
                $('#menu ul').animate({height:'19em'},200);
                $('#storytitle').animate({'margin-top':'13em'},200);
                $('#menu ul li:hidden').fadeIn();
            };
    });
    
$('#li1').on('click', function(){
  document.execCommand('bold', false, '');
              });

$('#li2').on('click', function(){
document.execCommand('underline', false, '');
});

 $('#li3').on('click', function(){
document.execCommand('italic', false, '');
});   

$('#li4').on('click', function(){
document.execCommand('formatBlock', false, 'h1');
});

$('#li5').on('click', function(){
document.execCommand('removeFormat', false, '');
});

$('#li6').on('click', function(){
document.execCommand('undo', false, '');
});
    
$('#li7').on('click', function(){
document.execCommand('redo', false, '');
});

$('#li8').on('click', function(){
    var linkURL = prompt('Enter a URL:', 'http://');
    var sText = document.getSelection();
    document.execCommand('insertHTML', false, '<a href="' + linkURL + '" target="_blank">' + sText + '</a>');
;
});


$('#li9').on('click', function(){
    document.execCommand('superscript', false, '');
});

$('#li10').on('click', function(){
    document.execCommand('subscript', false, '');
});

$('#li11').spectrum({
        showAlpha: true,
        showPalette: true,
        showSelectionPalette: true,
        preferredFormat: 'hex',
        palette: aColors,
        change: function(color) 
        {
            document.execCommand('hiliteColor', false, color);
        }
    }, "toggle");

$('#li12').spectrum({
        showAlpha: true,
        showPalette: true,
        showSelectionPalette: true,
        preferredFormat: 'hex',
        palette: aColors,
        change: function(color) 
        {
            document.execCommand('foreColor', false, color);
        }
    }, "toggle");


    $('#li13').on('click', function(){
    document.execCommand('formatBlock', false, 'h3');
    });

    $('#li14').on('click', function(){
    document.execCommand('increaseFontSize', false, '');
    });

    $('#li15').on('click', function(){
    document.execCommand('decreaseFontSize', false, '');
    });

    $('#li16').on('click', function(){
    document.execCommand('indent', false, '');
    });

    $('#li17').on('click', function(){
    document.execCommand('outdent', false, '');
    });

    $('#li18').on('click', function(){
        var linkURL = prompt('Enter a URL:', 'http://');
        var sText = document.getSelection();
        document.execCommand('insertImage', false, linkURL);
    });

   
    $('#li19').on('click', function(){
    document.execCommand('insertOrderedList', false, '');
    });
        
    $('#li120').on('click', function(){
    document.execCommand('insertUnorderedList', false, '');
    });

    $('#li21').on('click', function(){
    document.execCommand('justifyLeft', false, '');
    });

    $('#li22').on('click', function(){
    document.execCommand('justifyRight', false, '');
    });

    $('#li23').on('click', function(){
    document.execCommand('justifyCenter', false, '');
    });

    $('#li24').on('click', function(){
    document.execCommand('justifyFull', false, '');
    });

    $('#li25').on('click', function(){
        var printDoc = new jsPDF();
        printDoc.fromHTML($('#storycontent').get(0), 10, 10, {'width': 180});
        printDoc.output("dataurlnewwindow"); 
    })
});  // DOM ready end
