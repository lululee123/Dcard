function newElement() {
  var inputValue = document.getElementById("myInput").value;
  if (inputValue === '') {
    alert("任務不能為空！！");
  } else {
    var addClass =  $('li').size();
    addClass = addClass + 1;
    $("#myUL").append('<li class='+ addClass +' ><span>' + $("#myInput").val() + '</span> <small><a href="#edit">EDIT</a>  <a href="#delete">DELETE</a></small></li>');
    firebase.auth().onAuthStateChanged(function(user) {
    var num =  $("li").size();
    var dataObj = firebase.database().ref().child(user.uid).child(num).update(
      {
        "inputValue":inputValue,
        "checked": "no"
      })
    })
  } 
  // clear the text
  $("#myInput").val("");
};

// on clicking the add button
$("#add").click(newElement);

// for the edit button
$(document).on("click", 'a[href="#edit"]', function () {
  // make the span editable and focus it
  $(this).closest("li").find("span").prop("contenteditable", true).focus();
  $(this).closest("li").find("small").append('<a href="#doneedit">DONE</a>');
  return false;
});

if ($(this).closest("li").find("span").focus()){
  this.disabled = true;
}
// for the delete button
$(document).on("click", 'a[href="#delete"]', function () {
  // remove the list item
    $(this).closest("li").fadeOut(function () { 
      var num = $(this).attr('class'); 
      firebase.auth().onAuthStateChanged(function(user) {
       var dataObj = firebase.database().ref().child(user.uid).child(num).remove();
      })
     $(this).remove();
    });
  return false;
});

//doneedit button
$(document).on("click", 'a[href="#doneedit"]', function () {
  var num = $(this).closest("li").attr('class'); 
  if (num.indexOf('checked') >= 0){
    num = num.replace(/ checked/, "");
  }
  console.log(num);
  var task = $(this).closest("li")[0].children["0"].innerText;
  firebase.auth().onAuthStateChanged(function(user) {
    var dataObj = firebase.database().ref().child(user.uid).child(num).update(
      {
        "inputValue": task
      })
  })
  $('a[href="#doneedit"]').remove();
  return false;
});

function doneFilter() {
 $("li").css('display','none');
 $("li.checked").css('display','block');
}

function notDoneFilter() {
 $("li").css('display','block');
 $("li.checked").css('display','none');
}

function noFilter() {
  $("li").css('display','block');
}

//don't show logout if not login
$(".logout").css('display','none');

//check login or signup
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.

    $(".login").css('display','none');
    $(".signup").css('display','none');
    $(".logout").css('display','block');

    var todoTask = firebase.database().ref().child(user.uid);
    todoTask.on("child_added", snap => {
      var status = snap.child("checked").val();
      var detail = snap.child("inputValue").val();
      $("#myUL").append('<li class=' + snap.key + '><span>' + detail + '</span> <small><a href="#edit">EDIT</a>  <a href="#delete">DELETE</a></small></li>');
      if (status == "yes"){
        var a = snap.key;
        document.getElementsByClassName(a)[0].classList.toggle('checked');
      }
    })
  } else {
    // No user is signed in.
    $(".login").css('display','block');
    $(".signup").css('display','block');
    $(".logout").css('display','none');

  }
});

function logout(){
  firebase.auth().signOut();
  location.reload();
}