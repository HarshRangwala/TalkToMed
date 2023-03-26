import { css } from "@emotion/react";

export const colors = {
    main: '#EB4511', /*red*/
    main_dark: '#B02E0C',
    background: '#FEFDFF', /*white*/
    background_dark: '#C1BFB5',
    accent: '#8EB1C7' /*blue*/,
    grey: '#888'
}

export const center = css({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
});

export const centeredPage = css([center, {
    paddingTop: '2rem',
    width: 'min(20rem, 80vh)'
}]);

export const main = css({
    minHeight: '100vh',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background
})

export const rounded = css({
    borderRadius: '0.25em'
})