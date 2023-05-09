(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
  typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.DropdownMenu = {}, global.Vue));
})(this, (function (exports, vue) { 'use strict';

  var script = vue.defineComponent({
    name: 'DropdownMenu',
    props: {
      isOpen: {
        type: Boolean,
        required: false,
        default: false
      },
      mode: {
        type: String,
        required: false,
        default: 'click'
      },
      dropup: {
        type: Boolean,
        required: false,
        default: false
      },
      direction: {
        type: String,
        required: false,
        default: 'left'
      },
      closeOnClickOutside: {
        type: Boolean,
        required: false,
        default: true
      },
      withDropdownCloser: {
        type: Boolean,
        required: false,
        default: false
      },
      containerZIndex: {
        type: String,
        required: false,
        default: '994'
      },
      overlay: {
        type: Boolean,
        required: false,
        default: true
      },
      overlayBgColor: {
        type: String,
        required: false,
        default: 'rgba(0, 0, 0, 0.2)'
      },
      overlayZIndex: {
        type: String,
        required: false,
        default: '992'
      },
      transition: {
        type: String,
        required: false,
        default: 'default'
      }
    },
    setup(props, _ref) {
      let {
        emit
      } = _ref;
      const baseClassName = 'v-dropdown-menu';
      const rootRef = vue.ref(null);
      const triggerRef = vue.ref(null);
      const overlayRef = vue.ref(null);
      const menu = vue.reactive({
        isOpen: props.isOpen,
        mode: props.mode,
        dropup: props.dropup,
        direction: props.direction,
        closeOnClickOutside: props.closeOnClickOutside,
        withDropdownCloser: props.withDropdownCloser,
        containerZIndex: props.containerZIndex,
        overlay: props.overlay,
        overlayBgColor: props.overlayBgColor,
        overlayZIndex: props.overlayZIndex,
        transition: props.transition
      });
      const activeClass = vue.computed(() => {
        return menu.isOpen ? `${baseClassName}--active` : null;
      });
      const modeClass = vue.computed(() => {
        return menu.mode === 'click' ? `${baseClassName}--mode-click` : `${baseClassName}--mode-hover`;
      });
      const dropupClass = vue.computed(() => {
        return menu.dropup ? `${baseClassName}--dropup` : null;
      });
      const directionClass = vue.computed(() => {
        let menuDirection = null;
        if (menu.direction === 'left') {
          menuDirection = `${baseClassName}--direction-left`;
        } else if (menu.direction === 'center') {
          menuDirection = `${baseClassName}--direction-center`;
        } else {
          menuDirection = `${baseClassName}--direction-right`;
        }
        return menuDirection;
      });
      vue.watch(() => props.isOpen, value => {
        if (menu.mode === 'click') {
          if (value) {
            setTimeout(() => {
              show();
            }, 1); // wait, bypass for closeOnClickOutside
          } else {
            setTimeout(() => {
              hide();
            }, 1); // wait, bypass for closeOnClickOutside
          }
        }
      });

      vue.watch(() => menu.isOpen, value => {
        if (menu.mode === 'click') {
          if (value) {
            emit('opened', props);
          } else {
            emit('closed', props);
          }
        }
      });
      vue.onMounted(() => {
        dropdownCloser();
        vue.nextTick(() => {
          if (menu.closeOnClickOutside) {
            registerCloseDropdownOnClickOutside();
          }
        });
        closeDropdownOnPopState();
      });
      vue.onBeforeUnmount(() => {
        destroyCloseDropdownOnClickOutside();
        destroyCloseDropdownOnPopState();
      });

      // Methods
      const show = () => {
        menu.isOpen = true;
      };
      const hide = () => {
        menu.isOpen = false;
      };
      const registerCloseDropdownOnClickOutside = () => {
        window.addEventListener('click', closeDropdownOnClickOutside);
      };
      const closeDropdownOnClickOutside = e => {
        if (menu.isOpen) {
          if (!rootRef.value.contains(e.target)) {
            menu.isOpen = false;
          }
        }
      };
      const destroyCloseDropdownOnClickOutside = () => {
        if (menu.closeOnClickOutside) {
          window.removeEventListener('click', closeDropdownOnClickOutside);
        }
      };
      const dropdownCloser = () => {
        if (menu.withDropdownCloser) {
          const dropdown = rootRef.value;
          dropdown.querySelectorAll('[dropdown-closer]').forEach(element => {
            element.addEventListener('click', () => {
              menu.isOpen = false;
            });
          });
        }
      };
      const closeDropdownOnPopState = () => {
        window.addEventListener('popstate', () => {
          if (menu.isOpen) {
            menu.isOpen = false;
          }
        });
      };
      const destroyCloseDropdownOnPopState = () => {
        window.removeEventListener('popstate', closeDropdownOnPopState);
      };
      return {
        rootRef,
        triggerRef,
        overlayRef,
        menu,
        show,
        hide,
        activeClass,
        modeClass,
        dropupClass,
        directionClass
      };
    }
  });

  const _hoisted_1 = {
    class: "v-dropdown-menu__header"
  };
  const _hoisted_2 = {
    class: "v-dropdown-menu__body"
  };
  const _hoisted_3 = {
    class: "v-dropdown-menu__footer"
  };
  const _hoisted_4 = {
    class: "v-dropdown-menu__header"
  };
  const _hoisted_5 = {
    class: "v-dropdown-menu__body"
  };
  const _hoisted_6 = {
    class: "v-dropdown-menu__footer"
  };
  function render(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("div", {
      class: vue.normalizeClass(["v-dropdown-menu", [_ctx.activeClass, _ctx.modeClass, _ctx.dropupClass, _ctx.directionClass]]),
      ref: "rootRef"
    }, [_ctx.menu.mode === 'click' ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, {
      key: 0
    }, [vue.createElementVNode("div", {
      class: "v-dropdown-menu__trigger",
      ref: "triggerRef",
      onClick: _cache[0] || (_cache[0] = vue.withModifiers($event => _ctx.menu.isOpen = !_ctx.menu.isOpen, ["prevent"]))
    }, [vue.renderSlot(_ctx.$slots, "trigger")], 512), vue.createVNode(vue.Transition, {
      mode: "out-in",
      name: _ctx.menu.transition
    }, {
      default: vue.withCtx(() => [vue.withDirectives(vue.createElementVNode("div", {
        class: "v-dropdown-menu__container",
        style: vue.normalizeStyle({
          'z-index': _ctx.menu.containerZIndex
        })
      }, [vue.createElementVNode("div", _hoisted_1, [vue.renderSlot(_ctx.$slots, "header")]), vue.createElementVNode("div", _hoisted_2, [vue.renderSlot(_ctx.$slots, "body")]), vue.createElementVNode("div", _hoisted_3, [vue.renderSlot(_ctx.$slots, "footer")])], 4), [[vue.vShow, _ctx.menu.isOpen]])]),
      _: 3
    }, 8, ["name"])], 64)) : vue.createCommentVNode("", true), _ctx.menu.mode === 'hover' ? (vue.openBlock(), vue.createElementBlock(vue.Fragment, {
      key: 1
    }, [vue.createElementVNode("div", {
      class: "v-dropdown-menu__trigger",
      ref: "triggerRef",
      onMouseover: _cache[1] || (_cache[1] = vue.withModifiers(function () {
        return _ctx.show && _ctx.show(...arguments);
      }, ["prevent"])),
      onMouseleave: _cache[2] || (_cache[2] = vue.withModifiers(function () {
        return _ctx.hide && _ctx.hide(...arguments);
      }, ["prevent"]))
    }, [vue.renderSlot(_ctx.$slots, "trigger")], 544), vue.createVNode(vue.Transition, {
      name: _ctx.menu.transition
    }, {
      default: vue.withCtx(() => [vue.withDirectives(vue.createElementVNode("div", {
        class: "v-dropdown-menu__container",
        style: vue.normalizeStyle({
          'z-index': _ctx.menu.containerZIndex
        }),
        onMouseover: _cache[3] || (_cache[3] = vue.withModifiers(function () {
          return _ctx.show && _ctx.show(...arguments);
        }, ["prevent"])),
        onMouseleave: _cache[4] || (_cache[4] = vue.withModifiers(function () {
          return _ctx.hide && _ctx.hide(...arguments);
        }, ["prevent"]))
      }, [vue.createElementVNode("div", _hoisted_4, [vue.renderSlot(_ctx.$slots, "header")]), vue.createElementVNode("div", _hoisted_5, [vue.renderSlot(_ctx.$slots, "body")]), vue.createElementVNode("div", _hoisted_6, [vue.renderSlot(_ctx.$slots, "footer")])], 36), [[vue.vShow, _ctx.menu.isOpen]])]),
      _: 3
    }, 8, ["name"])], 64)) : vue.createCommentVNode("", true), _ctx.menu.overlay && _ctx.menu.closeOnClickOutside && _ctx.menu.mode === 'click' ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("div", {
      key: 2,
      class: "v-dropdown-menu__overlay",
      ref: "overlayRef",
      style: vue.normalizeStyle({
        'background-color': _ctx.menu.overlayBgColor,
        'z-index': _ctx.menu.overlayZIndex
      }),
      onMousedown: _cache[5] || (_cache[5] = vue.withModifiers(function () {
        return _ctx.hide && _ctx.hide(...arguments);
      }, ["prevent"]))
    }, null, 36)), [[vue.vShow, _ctx.menu.isOpen]]) : vue.createCommentVNode("", true)], 2);
  }

  script.render = render;

  // Import vue component

  // Default export is installable instance of component.
  // IIFE injects install function into component, allowing component
  // to be registered via Vue.use() as well as Vue.component(),
  var entry = /*#__PURE__*/(() => {
    // Assign InstallableComponent type
    const installable = script;

    // Attach install function executed by Vue.use()
    installable.install = app => {
      app.component('DropdownMenu', installable);
    };
    return installable;
  })();

  // It's possible to expose named exports when writing components that can
  // also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
  // export const RollupDemoDirective = directive;

  exports["default"] = entry;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
