/**
=========================================================
* Argon Dashboard 2 PRO MUI - v3.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-mui
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

const item = {
  width: "100%",
  padding: 0,
  cursor: "pointer",
};

function itemContent(theme, ownerState) {
  const { palette, typography, transitions, functions } = theme;
  const { active, miniSidenav, darkSidenav, name, nested } = ownerState;

  const { white, dark } = palette;
  const { size, fontWeightMedium, fontWeightRegular } = typography;
  const { pxToRem, rgba } = functions;

  return {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    padding: `${pxToRem(7.2)} ${pxToRem(16)}`,
    margin: `0 ${pxToRem(10)} 0 ${pxToRem(6)}`,
    userSelect: "none",
    position: "relative",
    color: active
      ? rgba(darkSidenav ? white.main : dark.main, 1)
      : rgba(darkSidenav ? white.main : dark.main, 0.8),

    "& span": {
      color: "inherit",
      fontWeight: active ? fontWeightMedium : fontWeightRegular,
      fontSize: size.sm,
      opacity: miniSidenav ? 0 : 1,
      transition: transitions.create(["opacity", "color"], {
        easing: transitions.easing.easeInOut,
        duration: transitions.duration.standard,
      }),
    },

    "&::before": {
      content: () => {
        if (nested) {
          return nested && miniSidenav && `"${name[0]}"`;
        }

        return miniSidenav ? `"${name[0]}"` : '""';
      },
      color: "inherit",
      fontWeight: active ? fontWeightMedium : fontWeightRegular,
      display: "flex",
      alignItems: "center",
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      left: pxToRem(-18),
      opacity: 1,
      borderRadius: "50%",
      fontSize: size.sm,
    },
  };
}

function itemArrow(theme, ownerState) {
  const { typography, transitions, functions } = theme;
  const { open, miniSidenav } = ownerState;

  const { size } = typography;
  const { pxToRem } = functions;

  return {
    fontSize: `${size.md} !important`,
    fontWeight: 700,
    marginRight: pxToRem(-2.5),
    transform: () => {
      if (open) {
        return miniSidenav ? `translateX(${pxToRem(-24)}) rotate(0)` : "rotate(0)";
      }

      return miniSidenav ? `translateX(${pxToRem(-24)}) rotate(-180deg)` : "rotate(-180deg)";
    },
    color: "inherit",
    transition: transitions.create(["color", "transform"], {
      easing: transitions.easing.easeInOut,
      duration: transitions.duration.shorter,
    }),
  };
}

export { item, itemContent, itemArrow };
