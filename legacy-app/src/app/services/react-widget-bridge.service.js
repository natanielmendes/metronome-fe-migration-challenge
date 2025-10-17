import { createRoot } from 'react-dom/client';
import { createElement } from 'react';
import { Provider } from 'react-redux';

/**
 * ReactWidgetBridgeService - Service for mounting React components inside AngularJS
 * Enables gradual migration by embedding React widgets in AngularJS screens
 */
export class ReactWidgetBridgeService {
  static $inject = ['$ngRedux'];

  constructor($ngRedux) {
    this.$ngRedux = $ngRedux;
    this.roots = new Map(); // Track mounted React roots
  }

  /**
   * Mount a React component at the specified DOM selector
   * @param {string} selector - CSS selector for mount point
   * @param {React.Component} Component - React component to mount
   * @param {object} props - Props to pass to component (optional)
   */
  mount(selector, Component, props = {}) {
    const container = document.querySelector(selector);
    
    if (!container) {
      console.error(`ReactWidgetBridge: Could not find container "${selector}"`);
      return;
    }

    // Check if already mounted
    if (this.roots.has(selector)) {
      console.warn(`ReactWidgetBridge: Component already mounted at "${selector}"`);
      return;
    }

    try {
      // In ng-redux, $ngRedux IS the store, not a wrapper
      const store = this.$ngRedux;
      const root = createRoot(container);
      
      // Wrap component with Redux Provider to share AngularJS store
      root.render(
        createElement(
          Provider,
          { store },
          createElement(Component, props)
        )
      );

      // Track root for cleanup
      this.roots.set(selector, root);
      
      console.log(`ReactWidgetBridge: Mounted React component at "${selector}"`);
    } catch (error) {
      console.error(`ReactWidgetBridge: Error mounting component at "${selector}"`, error);
    }
  }

  /**
   * Unmount React component from the specified selector
   * @param {string} selector - CSS selector of mounted component
   */
  unmount(selector) {
    const root = this.roots.get(selector);
    
    if (!root) {
      console.warn(`ReactWidgetBridge: No component mounted at "${selector}"`);
      return;
    }

    try {
      root.unmount();
      this.roots.delete(selector);
      console.log(`ReactWidgetBridge: Unmounted React component from "${selector}"`);
    } catch (error) {
      console.error(`ReactWidgetBridge: Error unmounting component from "${selector}"`, error);
    }
  }

  /**
   * Unmount all React components
   */
  unmountAll() {
    this.roots.forEach((root, selector) => {
      try {
        root.unmount();
        console.log(`ReactWidgetBridge: Unmounted "${selector}"`);
      } catch (error) {
        console.error(`ReactWidgetBridge: Error unmounting "${selector}"`, error);
      }
    });
    this.roots.clear();
  }

  /**
   * Check if a component is mounted at the specified selector
   * @param {string} selector
   * @returns {boolean}
   */
  isMounted(selector) {
    return this.roots.has(selector);
  }
}

