/**
 * Created by Juanito-PC on 10/12/2016.
 */
var empleadoControllers = angular.module('empleadoControllers', []);

empleadoControllers.controller('datosUsuarioCtrl', ['$scope','$routeParams', '$http', function ($scope, $routeParams, $http) {

    console.log($routeParams);
    var id = angular.toJson($routeParams);
    console.log(id);
    datosUsuario(id);
    
    function datosUsuario($idUsuario){

         $http.post('http://localhost/apiPhp/V1/usuarios/obtenerUsuariosId', $idUsuario).then(function (r) {
            console.log(r.data);
            $scope.model = r.data;
        })
    }
}]);

empleadoControllers.controller('usuariosListadoCtrl', ['$scope', '$http', function ($scope, $http) {
    
    listadoUsuario();
    
    
    function listadoUsuario(){
        $http.get('http://localhost:80/apiPhp/V1/usuarios/obtenerUsuarios').then(function (r) {
            //console.log(r.data);
            $scope.model = r.data;
        });
    }

    $scope.retirar = function (id) {
       var v = 'http://localhost/apiPhp/V1/usuarios/' + id;

        if(confirm('Esta seguro de eliminar este usuario?')){
            $http.delete(v).then(function (r) {
                listadoUsuario();
            });
        }
    }
}]);

empleadoControllers.controller('listadoEstructurasCtrl', ['$scope', '$http', function ($scope,  $http) {

    listadoEstructuras();

    function listadoEstructuras() {

        $http.get('http://localhost:80/apiPhp/V1/estructuras/obtenerEstructuras').then(function (r) {
            $scope.model = r.data;
        });
    }


    $scope.retirar = function (id) {
        var v = 'http://localhost/apiPhp/V1/estructuras/' + id;

        if(confirm('Esta seguro de eliminar esta estructura?')){
            $http.delete(v).then(function (r) {
                listadoEstructuras();
            });
        }
    }
}]);

empleadoControllers.controller('verEstructurasCtrl', ['$scope','$routeParams', '$http', function ($scope, $routeParams, $http) {

    var id = angular.toJson($routeParams);
    console.log(id);
    datosUsuario(id);

    function datosUsuario($idEstructura){


        $http.post('http://localhost/apiPhp/V1/estructuras/obtenerEstructurasId', $idEstructura).then(function (r) {
            console.log(r.data);
            $scope.model = r.data;
        })
    }
}]);

empleadoControllers.controller('registrarUserCtrl', ['$scope', '$routeParams', '$http', function ($scope, $routeParams, $http) {

    $scope.registrar = function() {

        console.log($scope.Permiso);
        console.log($scope.DNI);
        console.log($scope.Nombre);
        console.log($scope.Apellido);
        console.log($scope.Pass);
        console.log($scope.Direccion);


        if(!existUsuario($scope.DNI)){
            console.log("entro if");
            var permi;
            if($scope.Permiso == 1){
                permi = "Si";
            }else{
                permi = "no";
            }

            if(angular.equals($scope.Pass, $scope.PassR)){

                var user = {
                        DNI: $scope.DNI,
                        nombre: $scope.Nombre,
                        apellido: $scope.Apellido,
                        contrasena: $scope.Pass,
                        direccion: $scope.Direccion,
                        permiso: permi
                };

                $http.post('http://localhost/apiPhp/V1/usuarios/registro', user).then(function (r) {
                    if(r.data.estado == 1){
                        alert(r.data.mensaje);
                        $location.path("/user");
                    }else if(r.data.estado == 6){
                        alert(r.data.mensaje);
                    }
                });

            }else{
                alert("Las contraseñas no coinciden.");

            }


        }else{
            alert("El usuario que desea registrar ya existe en la base de datos.");
        }
    };


    function existUsuario($dni){

        var data = {
            DNI: $dni
        }

        $http.post('http://localhost/apiPhp/V1/usuarios/obtenerUsuariosId', data).then(function (r) {
            if(r.data.estado == 1){
                return true;
            }else{
                return false;
            }
        })
    }

}]);
