/* global angular, resume, Velocity */
'use strict';
var resume = angular.module('resume',[]);

resume.directive('overlay',function(){
    return{
        restrict:'E',
        template:'<div class="overlay"></div>',
        replace:true,
        link:function(scope,el,attr,ctrl){
            var overlay = el[0];
            window.addEventListener('load',function(){
                Velocity(overlay,"slideUp","linear",{duration:1500});
            });
        }
    };
});

resume.directive('containerLeft',function(){
    return{
        restrict:'E',
        require:'^resumeContainer',
        replace:true,
        templateUrl:'deploy/templates/containerLeftTemplate.html',
        controller:function(){
            
        },
        link:function(scope,el,attr,ctrl){
            console.log(ctrl.getData);
        }
    };
});

resume.directive('containerRight',function(){
    return {
        restrict: 'E',
        require:"^resumeContainer",
        templateUrl:'deploy/templates/containerLeftTemplate.html',
        controller:function(){
            
        },
        link:function(scope,el,attr,ctrl){
            console.log(ctrl.getData);
        }
    };
});

resume.directive('resumeContainer',['$http',function($http){
    return{
        restrict:"E",
        transclude:true,
        template:'<div class="wrapper clearfix">'+
        '<data-ng-transclude></data-ng-transclude>'+
        '</div>',
        require:"resumeContainer",
        controller:function(){
            var data = data || {};
            this.parseData = function(datajson){
                for (var a in datajson){
                    var key = Object.keys(datajson[a]);
                    data[key] = datajson[a];
                }
            };
            this.getAllData = function(){
                return data;
            };
            this.getContact = function(){
                return data.Contact;
            };
            this.getAbout = function(){
                return data.About;
            };
            this.getXP = function (){
                return data.XP;
            };
            this.getSkills = function (){
                return data.Skills;
            };
            this.getLanguages = function (){
                return data.Languages;
            };
            this.getTrivia = function (){
                return data.Trivia;
            };
        },
        link:function(scope,el,attr,resumeContainerCtrl){
            $http.get(attr.source).then(
                // success
                function(response){
                    var res = response.data.info;
                    resumeContainerCtrl.parseData(res);
                    scope.$broadcast('data-loaded',res);
                },
                // error
                function(){
                    console.log('no data');
                }
            );
        }
    };
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
   return {
       restrict:"E",
       require:"collapsingContainer",
       controller:function(){
           var info = [];
           this.addItem = function(item){
               info.push(item);
           };
           
           this.data = this.data || {};
           this.maxItems = 0;
       },
       link:function(scope,el,attr,collapsingContainerCtrl){
        collapsingContainerCtrl.maxItems = attr.max;
        // $http.get(attr.source)
        // .then(function(response){
        //   collapsingContainerCtrl.data = response.data;
        //   scope.$broadcast('data-loaded',collapsingContainerCtrl.data);
        // },
        // function(){
        //   console.error('ups... no data!');
        // });
       },
       
   };
}]);

resume.directive('collapsing-section',function(){
    return{
        restrict : "E",
        require : "^collapsingContainer",
        replace:true,
        templateUrl:"./templates/collapsingSectionTemplate.html",
        scope:{
            
        },
        controller:function($scope){
            $scope.$on('data-loaded',function(e,data){
               console.log('data available',data); 
            });
        }
    };
});
