// Layouts
import App from './components/App';

// Pages
import ComponentsPage from './pages/ComponentsPage/ComponentsPage';
import ComponentPage from './pages/ComponentPage/ComponentPage';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import DemosPage from './pages/DemosPage/DemosPage';
import DemoPage from './pages/DemoPage/DemoPage';
import GuidePage from './pages/GuidePage/GuidePage';
import LoadingPage from './pages/LoadingPage/LoadingPage';
import LoginPage from './pages/LoginPage/LoginPage';
import NotesPage from './pages/NotesPage/NotesPage';
import NotePage from './pages/NotePage/NotePage';

const routes = [{
  component: App,
  routes: [
    {
      path: '/',
      exact: true,
      component: LoadingPage
    },
    {
      path: '/components',
      component: ComponentsPage
    },
    {
      path: '/component/:componentId',
      component: ComponentPage
    },
    {
      path: '/dashboard',
      component: DashboardPage
    },
    {
      path: '/demos',
      component: DemosPage
    },
    {
      path: '/demo/:demoId',
      component: DemoPage
    },
    {
      path: '/login',
      component: LoginPage
    },
    {
      path: '/notes',
      component: NotesPage
    },
    {
      path: '/note/:noteId',
      component: NotePage
    },
    {
      path: '/note/:noteId/:edit',
      component: NotePage
    },
    {
      path: '/onboarding',
      component: GuidePage
    },
    {
      path: '/onboarding/:noteId',
      component: GuidePage
    }
  ]
}];

export default routes;
