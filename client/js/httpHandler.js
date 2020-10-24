(function () {

  const serverUrl = 'http://127.0.0.1:3000';

  //
  // TODO: build the swim command fetcher here
  //

const getCommand = () => {
  $.ajax({
  type: 'GET',
  url: serverUrl,
  data: {},
  cache: false,
  contentType: false,
  processData: false,
  success: (data) => {
    console.log('command success!!: ', data);
    SwimTeam.move(data);
  },
  error: (data) => {
    console.log('error: ', data);
  }
})}

const getBackground =() => {
  $.ajax({
  type: 'GET',
  url: serverUrl + '/background.jpg',
  cache: false,
  contentType: false,
  processData: false,
  success: (image) => {
    console.log('background success!!: ');
    $('.background').css({'background-image': 'url(http://127.0.0.1:3000/background.jpg)'})
  },
  error: (data) => {
    console.log('error: ', data);
  }
})}

setInterval(getCommand, 1000);
setInterval(getBackground, 5000);




  // setInterval(() => $.ajax({
  //   type: 'GET',
  //   url: serverUrl,
  //   data: {name:'hi my name is Namsoo'},
  //   cache: false,
  //   contentType: false,
  //   processData: false,
  //   success: (data) => {
  //     //console.log('success!!: ', data);
  //     SwimTeam.move(data);
  //   },
  //   error: (data) => {
  //     console.log('error: ', data);
  //   }
  // }), 1000)


  /////////////////////////////////////////////////////////////////////
  // The ajax file uplaoder is provided for your convenience!
  // Note: remember to fix the URL below.
  /////////////////////////////////////////////////////////////////////

  const ajaxFileUplaod = (file) => {
    var formData = new FormData();
    formData.append('file', file);
    console.log('formdata', formData)
    $.ajax({
      type: 'POST',
      data: formData,
      url: serverUrl ,
      cache: false,
      contentType: false,
      processData: false,
      success: (image) => {
        // reload the page
        console.log('file upload success!!!!', image)
        window.location = window.location.href;
      }
    });
  };

  $('form').on('submit', function (e) {
    e.preventDefault();

    var form = $('form .file')[0];
    if (form.files.length === 0) {
      console.log('No file selected!');
      return;
    }

    var file = form.files[0];
    if (file.type !== 'image/jpeg') {
      console.log('Not a jpg file!');
      return;
    }
    console.log(file);

    ajaxFileUplaod(file);

  });

})();