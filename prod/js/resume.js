/* global resume, Velocity */
resume.directive('overlay',function(){
    return{
        restrict:'E',
        template:'<div class="overlay"></div>',
        replace:true,
        link:function(scope,el,attr,ctrl){
            var overlay = el[0];
            window.addEventListener('load',function(){
                Velocity(overlay,"slideUp","linear",{
                    duration:1000
                    }
                );
            });
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
        controller:function(){
            var data = data || {};
            this.setData = function(datajson){
                // $scope.data = datajson; 
            };
            this.getData = function(){
                return data;
            };
        },
        link:function(scope,el,attr,resumeContainerCtrl){
            $http.get(attr.source).then(
                // success
                function(response){
                    var res = response.data;
                    scope.$broadcast('data-loaded',res);
                    // console.log(response);
                },
                // error
                function(){
                    console.log('no data');
                }
            );
        }
    };
}]);

resume.controller('mainController',['$scope',function($scope){
    this.data = this.data || {};
    // this.setData = function(e){
    //     console.log(e);
    // };
    // this.moreMsg = "show more";
    // this.lessMsg = "show less";
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
        templateUrl:"app/templates/collapsingSectionTemplate.html",
        scope:{
            
        },
        controller:function($scope){
            $scope.$on('data-loaded',function(e,data){
               console.log('data available',data); 
            });
        }
    };
});
// resume.directive('toggleButton',function(){
    
// });

// resume.directive('item',function(){
//     return {
//         restrict:'E',
        
//     };
// });

// resume.directive('hidden',function(){
//     return{
//         restrict:"A",
        
//     };
// });