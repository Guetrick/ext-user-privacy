/**
 * Navigator component connector.
 * @module connectors/navigator
 */

import { connect } from 'react-redux';
import { goBackHistory } from '@shopgate/pwa-common/actions/history';
import { logo } from '../../config/app';
import { setSearchPhrase, toggleSearch } from './action-creators';
import {
  setNavigatorBackground,
  setNavigatorColor,
  enableNavigatorIconShadow,
  disableNavigatorIconShadow,
  enableNavigatorSearch,
  disableNavigatorSearch,
  enableNavigatorTitle,
  disableNavigatorTitle,
  enableNavigator,
  disableNavigator,
  submitSearch,
  toggleNavDrawer,
} from './actions';
import { isCurrentViewLoading } from '../View/selectors';

/**
 * Maps the contents of the state to the component props.
 * @param {Object} state The current application state.
 * @return {Object} The extended component props.
 */
const mapStateToProps = state => ({
  action: state.history.action,
  backgroundColor: state.navigator.backgroundColor,
  textColor: state.navigator.textColor,
  historyLength: state.history.length,
  logoUrl: logo,
  path: state.history.pathname,
  title: state.history.state.title || '',
  searchActive: state.navigator.searchActive,
  searchPhrase: state.navigator.searchPhrase,
  showIconShadow: state.navigator.showIconShadow,
  showCartIcon: state.navigator.showCartIcon,
  showSearch: state.navigator.showSearch,
  showTitle: state.navigator.showTitle,
  showLoadingBar: isCurrentViewLoading(state),
  navDrawerActive: state.navigator.navDrawerActive,
  navigatorEnabled: state.navigator.enabled,
  filterOpen: state.navigator.filterOpen,
  filterAttributeOpen: state.navigator.filterAttributeOpen,
  loginOpen: state.navigator.loginOpen,
});

/**
 * Maps action dispatchers to the component props.
 * @param {function} dispatch The store dispatcher.
 * @return {Object} The extended component props.
 */
const mapDispatchToProps = dispatch => ({
  setSearchPhrase: query => dispatch(setSearchPhrase(query)),
  submitSearch: () => dispatch(submitSearch()),
  goBackHistory: (amount = 1) => dispatch(goBackHistory(amount)),
  toggleSearch: active => dispatch(toggleSearch(active)),
  toggleNavDrawer: active => dispatch(toggleNavDrawer(active)),
  setNavigatorBackground: color => dispatch(setNavigatorBackground(color)),
  setNavigatorColor: color => dispatch(setNavigatorColor(color)),
  enableNavigatorIconShadow: () => dispatch(enableNavigatorIconShadow()),
  disableNavigatorIconShadow: () => dispatch(disableNavigatorIconShadow()),
  enableNavigatorSearch: () => dispatch(enableNavigatorSearch()),
  disableNavigatorSearch: () => dispatch(disableNavigatorSearch()),
  enableNavigatorTitle: () => dispatch(enableNavigatorTitle()),
  disableNavigatorTitle: () => dispatch(disableNavigatorTitle()),
  disableNavigator: () => dispatch(disableNavigator()),
  enableNavigator: () => dispatch(enableNavigator()),
});

/**
 * Connects a component to the navigator store.
 * @param {Object} Component A react component.
 * @return {Object} The react component with extended props.
 */
const navigator = Component =>
  connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(Component)
;

export default navigator;
