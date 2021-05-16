var dropdown=$('#dog-breeds');
//Getting data in dropdown list
$.ajax({
    url:'https://dog.ceo/api/breeds/list/all',
    method: 'GET',
    success: function(data){
        for(let breed in data.message){
            let item='<option>'+breed+'</option>';
            dropdown.append(item);
        }
    }
});

//when value of dropdown list changes,this event is triggered
dropdown.change(function(){
    let breed=dropdown.val();
    $("#dog-subBreeds").remove();
    $.ajax({
        url:'https://dog.ceo/api/breed/'+breed+'/list',
        method: 'GET',
        success: function(data){
            if(data.message.length==0){
                return;
            }

            $('#dog-breeds').after('<select id="dog-subBreeds"></select>');
            for(let subBreed of data.message){
                let item='<option>'+subBreed+'</option>';
                $('#dog-subBreeds').append(item);
            }

        }
    });
});







//Clicking Button
$('form button').on('click',function(event){
    event.preventDefault();
    $('#breed-image').empty();

    let breed=dropdown.val();
    let subBreed=$('#dog-subBreeds').val();
    
    //when no subreed exists
    if(subBreed == undefined){
        $.ajax({
            url:'https://dog.ceo/api/breed/'+breed+'/images',
            method:'GET',
            success:function(data){
                for(let image_url of data.message){
                    $('<img>',{
                        src:image_url,
                        class:"img"
                    }).appendTo('#breed-image');
                }
            }
        });
    }
    else{
        $.ajax({
            url:'https://dog.ceo/api/breed/'+breed+'/'+subBreed+'/images',
            method:'GET',
            success:function(data){
                for(let image_url of data.message){
                    $('<img>',{
                        src:image_url,
                        class:"img"
                    }).appendTo('#breed-image');
                }
            }
        });

    }

    
});