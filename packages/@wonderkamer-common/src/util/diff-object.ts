/**
 *
 * Find differences between two (dictionary) objects
 *
 * differences: {
 *  RESIN_SUPERVISOR_DELTA: { from: '1', to: null },
 *  RESIN_SUPERVISOR_DELTA_VERSION: { from: '3', to: undefined },
 *  BALENA_HOST_CONFIG_disable_overscan: { from: undefined, to: '1' },
 *  BALENA_HOST_CONFIG_hdmi_boost: { from: undefined, to: null },
 *  BALENA_HOST_CONFIG_hdmi_force_hotplug: { from: undefined, to: null },
 *  BALENA_HOST_CONFIG_overscan_bottom: { from: undefined, to: '0' },
 *  BALENA_HOST_CONFIG_overscan_left: { from: undefined, to: '0' },
 *  BALENA_HOST_CONFIG_overscan_right: { from: undefined, to: '0' },
 *  BALENA_HOST_CONFIG_overscan_top: { from: undefined, to: '0' },
 *  BALENA_HOST_FIREWALL_MODE: { from: undefined, to: null },
 *  RESIN_HOST_CONFIG_dtoverlay: { from: undefined, to: null },
 *  RESIN_HOST_FIREWALL_MODE: { from: undefined, to: null }
 * }
 */

export default function diffObjects(obj1: any, obj2: any) {
  const diff: any = {};

  // Check keys in obj1
  Object.keys(obj1).forEach((key) => {
    if (!(key in obj2)) {
      diff[key] = { from: obj1[key], to: undefined };
    } else if (obj1[key] !== obj2[key]) {
      diff[key] = { from: obj1[key], to: obj2[key] };
    }
  });

  // Check keys in obj2 that might not be in obj1
  Object.keys(obj2).forEach((key) => {
    if (!(key in obj1)) {
      diff[key] = { from: undefined, to: obj2[key] };
    }
  });

  return diff;
}
