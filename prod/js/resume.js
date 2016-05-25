/*global angular*/
'use strict';
var resume = angular.module('resume',[]);

resume.controller('mainController',['$scope',function($scope){
    $scope.dom = {};
    this.moreMsg = "show more";
    this.lessMsg = "show less";
    this.shown = false;
}]);

resume.controller('leftController',['$scope',function($scope){
    this.icons = {
        gmail:{
            label:"gmail",
            icon:"fa fa-envelope-o fa-2x",
            path:"mailto:yoggsoft@gmail.com"
        },
        github:{
            label:"github",
            icon:"fa fa-github fa-2x",
            path:"https://www.github.com/yoggsoft"
        },
        
        linkedin:{
            label:"linkedin",
            icon:"fa fa-linkedin fa-2x",
            path:"https://ar.linkedin.com/in/querales"
        },
        codepen:{
            label:"codepen",
            icon:"fa fa-codepen fa-2x",
            path:"https://codepen.io/yoggsoft/"
        }
        
    };
}]);

resume.controller('rightController', ['$scope', function($scope) {
    this.skills = {
        techskills: {
            label:"Technical Skills",
            data:[
                'HTML5',
                'CSS3',
                'SASS',
                'AngularJS',
                'Git',
                'ActionScript',
                'Javascript',
                'Node',
                'Grunt',
                'jQuery',
                'Rich Media',
                'PHP',
                'Wordpress'
                ]
        },
        certs: {
            label:"Certification & Awards",
            data:['DoubleClick','Autodesk Maya','Google Web Designer']
        },
        languages: {
            label:"Languages",
            data:['Spanish','English','Portuguese','German','French']
        },
        interests: {
            label:"Interests",
            data:['Internet','Music','Videogames','Real Madrid','Technology','Development']
        }
    };
}]);

resume.directive('collapsingContainer',['$http',function($http){
   return{
       restrict:"E",
       require:"collapsingContainer",
       controller:function(){
           this.data = this.data || {};
           this.maxItems = 0;
       },
       link:function(scope,el,attr,collapsingContainerCtrl){
        collapsingContainerCtrl.maxItems = attr.max;
        $http.get(attr.source)
        .then(function(response){
           collapsingContainerCtrl.data = response.data;
           console.log(response.data);
           scope.$broadcast('data-loaded',collapsingContainerCtrl.data);
        },
        function(){
           console.log('ups... no data!');
        });
       }
   } ;
}]);
