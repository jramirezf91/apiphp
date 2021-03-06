var app = angular.module('myApp', [
  'ngRoute',
  'empleadoControllers',
  'ngCookies'

]);

app.config(['$routeProvider',
    function($routeProvider) {
      $routeProvider.
          when('/admin',{
              templateUrl: 'htmls/botones.html',
              controller: 'admininiCtrl'
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
          .when('/registrarEs', {
              templateUrl: 'htmls/crearEstructura.html',
              controller: 'registrarEstructuraCtrl'
      })
          .when('/login', {
            templateUrl: 'login.html',
            controller: 'loginCtrl'
      })
          .when('/userini', {
              templateUrl: 'htmls/userini.html',
              controller: 'useriniCtrl'
      })
          .when('/addEstruc/:idUsuario', {
              templateUrl: 'htmls/addEstruc.html',
              controller: 'addestrucCtrl'
      })
          .when('/delEstruc/:idUsuario', {
              templateUrl: 'htmls/delEstruc.html',
              controller: 'delestrucCtrl'
      })
          .when('/userestructuras/:idEstructura', {
              templateUrl: 'htmls/userverstruct.html',
              controller: 'userverEstructurasCtrl'
      })
          .when('/perfil/:idUsuario', {
              templateUrl: 'htmls/perfil.html',
              controller: 'datosUsuarioCtrl'
      })
          .when('/modiUser/:idUsuario',{
              templateUrl: 'htmls/modificarUser.html',
              controller: 'modificarUserCtrl'
          })
          .when('/modiEstruc/:idEstructura',{
              templateUrl: 'htmls/modificarEstructura.html',
              controller: 'modificarEstructuraCtrl'
          })
          .when('/fotoUser/:dni', {
              templateUrl: 'htmls/fotoUser.html',
              controller: 'cambiarFotoCtrl'
          })
          .when('/perfilAdmin/:idUsuario',{
              templateUrl: 'htmls/perfiladmin.html',
              controller: 'datosUsuarioCtrl'
          })
          .when('/defectos/:idUsuario', {
              templateUrl: 'htmls/defectos.html',
              controller: 'defectosCtrl'
          })
          .when('/registrarDef', {
              templateUrl: 'htmls/addDefecto.html',
              controller: 'addDefectosCtrl'
          })
          .when('/userelecdefecto/:idEstructura', {
              templateUrl: 'htmls/userelecdefecto.html',
              controller: 'userelecdefectoCtrl'
          })
          .when('/editarDefecto/:idDefecto', {
              templateUrl: 'htmls/modificarDefecto.html',
              controller: 'modificarDefectoCtrl'
          })
          .when('/analisis/:idEstructura/:idDefecto', {
              templateUrl: 'htmls/UserAnalisis.html',
              controller: 'analisisCtrl'
          })
          .otherwise({
          redirectTo: '/login'
      });
}]);


app.run(['$rootScope', '$location', '$cookieStore', function ($rootScope, $location, $cookieStore) {

    $rootScope.globals = $cookieStore.get('globals') || {};

    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        // redirect to login page if not logged in
        if ($location.path() !== '/login' && !$rootScope.globals.usuario) {
            $location.path('/login');
        }

        if($location.path() == '/'){
            if($rootScope.globals.usuario.permiso == 1){
                $location.path('/admin');
            }else{
                $location.path('/userini');
            }
        }
    });
    
}]);

app.factory("auth", function ($cookies, $cookieStore, $location) {
    return{
        logout : function () {
            $cookieStore.remove("id");
            $cookieStore.remove("permiso");

            $location.path('/login');
        }
    }
    
});

app.directive('uploaderModel', ["$parse", function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, iElement, iAttrs)
        {
            iElement.on("change", function(e)
            {
                $parse(iAttrs.uploaderModel).assign(scope, iElement[0].files[0]);
                $scope.$apply();
            });
        }
    };
}]);

app.service('upload', ["$http", "$q", function ($http, $q)
    {
        this.uploadFile = function(file, name)
        {
            var deferred = $q.defer();
            var formData = new FormData();
            formData.append("name", name);
            formData.append("file", file);
            return $http.post("server.php", formData, {
                headers: {
                    "Content-type": undefined
                },
                transformRequest: angular.identity
            }).then(function(res){
                    deferred.resolve(res);
                });
                //.error(function(msg, code){
                  //  deferred.reject(msg);
                //});
            return deferred.promise;
        }
    }]);