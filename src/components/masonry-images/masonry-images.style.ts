import { styled, Breakpoint } from '@mui/material';

export const MasonryList = styled('ul')<{
  columnCount: Partial<Record<Breakpoint, number>>;
}>(({ columnCount, theme: { breakpoints, spacing } }) =>
  Object.entries(columnCount).reduce(
    (prev, [breakpoint, cols]) =>
      prev +
      `
      ${breakpoints.up(breakpoint as Breakpoint)} {
        column-count: ${cols};
      }
    `,
    `
    list-style: none;
    padding: ${spacing(1)};
    column-gap: ${spacing(1)};
    margin: 0;

    li {
      margin-bottom: ${spacing(1)};
    }
    `
  )
);

export const MasonryItem = styled('li')(
  ({ theme: { shape, shadows, transitions } }) => `
  display: block;
  border-radius: ${shape.borderRadius}px;
  box-shadow: ${shadows[4]};
  overflow: hidden;
  transition: box-shadow ${transitions.easing.easeIn} ${transitions.duration.short}ms;
  cursor: pointer;

  img {
    display: block;
    object-fit: cover;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    transition: transform ${transitions.easing.easeIn} ${transitions.duration.short}ms;
  }

  &:hover {
    box-shadow: ${shadows[8]};

    img {
      transform: scale(1.1);
    }
  }
`
);

export const Seperator = styled('div')(
  ({ theme: { palette, spacing } }) => `
  display: flex;
  align-items: center;
  color: ${palette.divider};
  font-size: ${spacing(4)};
  margin: ${spacing(4)} 0;

  .curve {
    height: ${spacing(3)};
    width: 100%;
  }
`
);
