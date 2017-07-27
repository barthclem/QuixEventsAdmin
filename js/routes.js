angular
.module('app')
.config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', '$breadcrumbProvider', function($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, $breadcrumbProvider) {

  $urlRouterProvider.otherwise('/dashboard');

  $ocLazyLoadProvider.config({
    // Set to true if you want to see what and when is dynamically loaded
    debug: true
  });

  $breadcrumbProvider.setOptions({
    prefixStateName: 'app.main',
    includeAbstract: true,
    template: '<li class="breadcrumb-item" ng-repeat="step in steps" ng-class="{active: $last}" ng-switch="$last || !!step.abstract"><a ng-switch-when="false" href="{{step.ncyBreadcrumbLink}}">{{step.ncyBreadcrumbLabel}}</a><span ng-switch-when="true">{{step.ncyBreadcrumbLabel}}</span></li>'
  });

  $stateProvider
  .state('app', {
    abstract: true,
    templateUrl: 'views/common/layouts/full.html',
    //page title goes here
    ncyBreadcrumb: {
      label: 'Root',
      skip: true
    },
    resolve: {
      loadCSS: ['$ocLazyLoad', function($ocLazyLoad) {
        // you can lazy load CSS files
        return $ocLazyLoad.load([{
          serie: true,
          name: 'Font Awesome',
          files: ['css/font-awesome.min.css']
        },{
          serie: true,
          name: 'Simple Line Icons',
          files: ['css/simple-line-icons.css']
        }]);
      }],
      loadPlugin: ['$ocLazyLoad', function ($ocLazyLoad) {
        // you can lazy load files for an existing module
        return $ocLazyLoad.load([{
          serie: true,
          name: 'chart.js',
          files: [
            'bower_components/chart.js/dist/Chart.min.js',
            'bower_components/angular-chart.js/dist/angular-chart.min.js'
          ]
        }]);
      }]
    }
  })
  .state('app.main', {
    url: '/dashboard',
    templateUrl: 'views/event.html',
    controller: 'EventController',
    controllerAs: '$ectrl',
    //page title goes here
    ncyBreadcrumb: {
      label: 'Home',
    },
    //page subtitle goes here
    params: { subtitle: 'Welcome to ROOT powerfull Bootstrap & AngularJS UI Kit' },
    // resolve: {
    //   loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
    //     // you can lazy load controllers
    //     return $ocLazyLoad.load({
    //       files: ['js/controllers/main.js']
    //     });
    //   }]
    // }
  })

  .state('app.Event', {
      url: '/events',
      templateUrl: 'views/event/eventPage.html',
      controller: 'RegistrationController',
      controllerAs: '$rctrl'
  })
  .state('app.createEvent', {
      url: '/createEvent',
      templateUrl: 'views/event/createEvent.html',
      controller: 'EventController',
      controllerAs: '$ectrl',
      resolve: {
          loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
              // you can lazy load controllers
              return $ocLazyLoad.load({
                  files: ['js/controllers/eventCtrl.js', 'js/services/EventService.js']
              });
          }]
      }
  })

  .state('app.events', {
      url: "/event",
      templateUrl: 'views/event.html',
      controller: 'EventController',
      controllerAs: '$ectrl',
      ncyBreadcrumb: {
          label: 'Organizer'
      },
  })
  .state('app.events.organizer', {
      url: '/organizer/:mode',
      templateUrl: 'views/event.html',
      ncyBreadcrumb: {
          label: 'My Events'
      }
  })
  .state('app.events.eventAdmin', {
      url: '/eventAdmin/:mode',
      templateUrl: 'views/event.html',
      ncyBreadcrumb: {
          label: 'My EventAdmins'
      }
  })
 .state('app.eventDetail', {
     url: '/eventDetail/:mode/:id',
     controller: 'EventDetailController',
     controllerAs: '$edctrl',
     templateUrl: 'views/event/eventDetails.html',
     ncyBreadcrumb: {
         label: 'Event Details'
     }
 })
  .state('app.addEventAdmin', {
      url: '/addEventAdmin/:eventId',
      templateUrl: 'views/eventAdmin/addEventAdmin1.html',
      controller: 'EventAdminController',
      controllerAs: '$eactrl'
  })
  .state('app.addEventAdmin2', {
      url: '/addEventAdmin2/:username',
      templateUrl: 'views/eventAdmin/addEventAdmin2.html',
      controller: 'AddEventAdminController',
      controllerAs: '$aeactrl'
  })
  .state('app.eventAdmins', {
      url: '/eventAdmins/:eventId',
      templateUrl: 'views/eventAdmin/eventAdminList.html',
      controller: 'EventAdminController',
      controllerAs: '$eactrl'
  })
  .state('app.category', {
      url: '/category/:mode/:eventId',
      templateUrl: 'views/category/manageCategories.html',
      controller: 'CategoryController',
      controllerAs: '$cctrl'
  })
  .state('app.createCategory', {
      url: '/createCategory/:eventId',
      templateUrl: 'views/category/addNewCategory.html',
      controller: 'CategoryController',
      controllerAs: '$cctrl'
  })
  .state('app.categoryDetail', {
      url: '/category/:mode/:eventId/:categoryId',
      templateUrl: 'views/category/categoryDetailsPage.html',
      controller: 'CategoryController',
      controllerAs: '$cctrl'
  })
  .state('app.createOrganizer', {
      url: '/createOrganizer',
      templateUrl: 'views/organizer/createOrganizer.html',
      controller: 'OrganizerController',
      controllerAs: '$octrl'
  })
  .state('app.createCategoryEntry', {
      url: '/categoryEntry/:eventId/:categoryId/',
      templateUrl: 'views/category/addNewCategoryEntry.html',
      controller: 'CategoryEntryController',
      controllerAs: '$cectrl'
  })

  .state('appSimple', {
    abstract: true,
    templateUrl: 'views/common/layouts/simple.html',
    resolve: {
      loadPlugin: ['$ocLazyLoad', function ($ocLazyLoad) {
        // you can lazy load files for an existing module
        return $ocLazyLoad.load([{
          serie: true,
          name: 'Font Awesome',
          files: ['css/font-awesome.min.css']
        },{
          serie: true,
          name: 'Simple Line Icons',
          files: ['css/simple-line-icons.css']
        }]);
      }],
    }
  })

  // Additional Pages
  .state('appSimple.login', {
    url: '/login',
    templateUrl: 'views/pages/login.html',
      controller: 'LoginController',
      controllerAs: '$lctrl',
    resolve: {
        loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
            // you can lazy load controllers
            return $ocLazyLoad.load({
                files: ['js/controllers/LoginCtrl.js']
            });
        }]
    }
  })
  .state('appSimple.register', {
    url: '/register',
    templateUrl: 'views/pages/register.html',
    controller: 'RegistrationController',
    controllerAs: '$rctrl'
  })
  .state('appSimple.404', {
    url: '/404',
    templateUrl: 'views/pages/404.html'
  })
  .state('appSimple.500', {
    url: '/500',
    templateUrl: 'views/pages/500.html'
  })
}]);
