const defaultTheme = {
  container: {
    background: 'white',
    boxShadow: '2px 2px 7px 0 rgba(0,0,0,0.75)',
    color: '#000000',
    fontFamily: '"Khula", sans-serif',
    padding: 30,
    position: 'absolute',
    textAlign: 'center',
    width: 270,
  },
  button: {
    border: 0,
    boxShadow: 0,
    background: 'none',
    outline: 'none',
    verticalAlign: 'middle',
  },
  content: {
    textAlign: 'left',
    paddingBottom: 20,
    lineHeight: 1.5,
  },
  title: {
    fontWeight: 300,
  },
}

export const ThemeT = {
  button: Object,
  container: Object,
  content: Object,
  title: Object,
}

export default defaultTheme
