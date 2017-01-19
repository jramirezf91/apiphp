var app = angular.module('myApp', [
  'ngRoute',
  'empleadoControllers'
]);

app.config(['$routeProvider',
    function($routeProvider) {
      $routeProvider.
          when('/',{
              templateUrl: 'htmls/botones.html'
      }).
       when('/user', {
        templateUrl: 'htmls/listado.html',
        controller: 'usuariosListadoCtrl'
      })
          .when('/user/:idUsuario', {
          templateUrl: 'htmls/ver.html',
          controller: 'datosUsuarioCtrl'
      })
          .when('/estructuras', {
              templateUrl: 'htmls/listEstructuras.html',
              controller: 'listadoEstructurasCtrl'
      })
          .when('/estructuras/:idEstructura', {
              templateUrl: 'htmls/verEstructura.html',
              controller: 'verEstructurasCtrl'
      })
          .when('/registrar',{
              templateUrl: 'htmls/crearUser.html',
              controller: 'registrarUserCtrl'
      })
          .when('/modificar',{
              templateURl: 'htmls/modificarUser.html',
              controller: 'modificarUserCtrl'
      })
          .when('/registrarEs', {
              templateUrl: 'htmls/crearEstructura.html',
              controller: 'registrarEstructuraCtrl'
      })
          .when('/modificarEs', {
              templateUrl: 'htmls/modificarEstructura.html',
              controller: 'modificarEstructuraCtrl'
      })
          .when('/login', {
          templateUrl: 'login.html',
          controller: 'loginCtrl'
      })
          .otherwise({
          redirectTo: '/'
      });
}]);
