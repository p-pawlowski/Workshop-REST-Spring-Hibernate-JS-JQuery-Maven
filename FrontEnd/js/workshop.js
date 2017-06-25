$(document).ready(function() {

  //Wczytanie listy książek zaraz po załadowaniu strony
  getBooks();

  /*
   * POBIERANIE I WYSWIETLANIE KSIAZEK Z BAZY
   */
  function getBooks() {
    var url = "http://localhost:8080/Warsztaty5/books/all";
    ajaxCaller(url, getCallBack);
  }

  //funkcja callbackowa wyswietlania informacji o ksiazce
  function getCallBack(result) {
    //czyszczenie starej zawartosci diva
    $('#getAll').html('');
    for (var i = 0; i < result.length; i++) {

      var button1 = $('<button>');
      button1.text('usuń');
      button1.attr('data-id', $(result).eq(i).attr('id'));
      button1.addClass('delButton');

      var divTitle = $('<div>').html(result[i].title + "&nbsp&nbsp");
      divTitle.addClass('title');
      divTitle.attr('data-id', $(result).eq(i).attr('id'));

      var divEmpty = $('<div><p>');
      divEmpty.addClass('empty');
      divEmpty.html('<br>');

      var newDiv = $('<div>');
      newDiv.addClass('book');
      newDiv.attr('id', $(result).eq(i).attr('id'));
      newDiv.append(divTitle);
      newDiv.append(button1);
      newDiv.append(divEmpty);

      //dodawanie nowej zawartosci diva
      $('#getAll').append(newDiv);
    }
  }

  /*
   *  DODAWANIE EVENTU DO ROZWIJANIA I ZWIJANIA ONFORMACJI O KSIAZCE
   */

  $('body').one('click', '.title', handler1);

  //ROZWIJANIE
  function handler1() {
    var empty = $(this).parent().find('.empty');
    var url = "http://localhost:8080/Warsztaty5/books/" + $(this).attr('data-id');
    ajaxCaller(url, dataCallBack, "GET", "", empty);
    $('body').one('click', '.title', handler2);
  }

  //ZWIJANIE
  function handler2() {
    $(this).parent().find('.empty').html('<br>');
    $('body').one('click', '.title', handler1);
  }

  // FUNKCJA CALLBACKOWA DO ROZWIJANIA
  function dataCallBack(result, empty) {
    var str = '';
    jQuery.each(result, function(i, val) {
      str += i + ': ' + val + '<br>';
    });
    str += '<br>';
    empty.html(str);
  }

  /*
   * DODAWANIE EVENTU DO PRZYCISKU USUWANIA
   */
  $('body').on('click', '.delButton', function() {
    url = "http://localhost:8080/Warsztaty5/books/remove/" + $(this).attr('data-id');
    ajaxCaller(url, getBooks, 'DELETE');
  });


  /*
   * EVENT DODAWANIA KSIAZKI Z FORMULARZA
   */
  $('[type="submit"]').on('click', function(event) {
    event.preventDefault();
    var form = $('form');
    var json = {
      "isbn": form.find('input[name="isbn"]').val(),
      "title": form.find('input[name="title"]').val(),
      "author": form.find('input[name="author"]').val(),
      "publisher": form.find('input[name="publisher"]').val(),
      "type": form.find('input[name="text"]').val()
    };
    url = "http://localhost:8080/Warsztaty5/books/add";
    ajaxCaller(url, addCallBack, 'POST', json);

  })

  //add Call Back. czyszczenie formularza i wczytywanie nowej listy ksiazek
  function addCallBack(){
    getBooks();
    $('form').find('input[type="text"]').each(function(){
    $(this).val('');
    });

  }

  /*
   * AJAX CALLER
   */
  function ajaxCaller(url, callback, method, json, empty) {
    $.ajax({
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        url: url,
        type: method || 'GET',
        data: JSON.stringify(json)
      })
      .done(function(result) {
        callback(result, empty);
      });
  }

})
