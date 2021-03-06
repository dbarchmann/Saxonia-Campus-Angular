'use strict'

login = angular.module 'shared.login', [
  'ab-base64'
]

login.controller 'LoginController', ['$rootScope', '$scope', '$state', '$window', '$modalInstance', '$log', 'base64', 'errorCount', ($rootScope, $scope, $state, $window, $modalInstance, $log, base64, errorCount) ->
  $scope.alert = "Ungültiger Benutzername oder Passwort." if errorCount > 0

  $scope.removeAlert = () ->
    delete $scope.alert
    return

  $scope.login = () ->
    if $scope.username? and $scope.password?
      $window.sessionStorage.token = base64.encode $scope.username + ':' + $scope.password
      $log.info 'broadcasting challengeAuth'
      $rootScope.$broadcast 'challengeAuth'
      $modalInstance.close true
      return
    return

  $scope.clearForm = () ->
    delete $scope.username
    delete $scope.password
    return
]
