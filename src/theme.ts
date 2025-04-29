import { createTheme, responsiveFontSizes } from "@mui/material/styles";

// Create base themes without component customizations
const baseLight = createTheme({
    typography: {
        fontFamily: '"Inter", sans-serif',
    },
    shape: {
        borderRadius: 8,
    },
    palette: {
        mode: "light",
        primary: {
            main: "#ff6f61",
        },
        background: {
            default: "#fbfbfb",
            paper: "#fbfbfb",
        },
        text: {
            primary: "#121212",
        },
    },
});

const baseDark = createTheme({
    typography: {
        fontFamily: '"Inter", sans-serif',
    },
    shape: {
        borderRadius: 8,
    },
    palette: {
        mode: "dark",
        primary: {
            main: "#ff6f61",
        },
        background: {
            default: "#121212",
            paper: "#181818", // Slight contrast for paper elements
        },
        text: {
            primary: "#fbfbfb",
        },
    },
});

// Create final themes with component customizations
// This approach avoids TypeScript errors with styleOverrides
let lightTheme = createTheme(baseLight, {
    shadows: Array(25).fill("none"),
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    backgroundColor: "#fbfbfb",
                },
            },
        },
        MuiButton: {
            defaultProps: {
                disableElevation: true, // Remove shadow through props instead of styleOverrides
            },
            styleOverrides: {
                root: {
                    textTransform: "none",
                    boxSizing: "border-box",
                    minHeight: "35px",
                    maxHeight: "35px",
                    lineHeight: "35px",
                    padding: "0 16px",
                },
                containedPrimary: {
                    color: "#fbfbfb", // Set text color to #fbfbfb for primary buttons
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    "& .MuiInputBase-root": {
                        height: "35px",
                    },
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    height: "35px",
                },
                input: {
                    padding: "8px 14px",
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                outlined: {
                    transform: "translate(14px, 8px) scale(1)",
                    "&.MuiInputLabel-shrink": {
                        transform: "translate(14px, -9px) scale(0.75)",
                    },
                },
            },
        },
        MuiPaper: {
            defaultProps: {
                elevation: 0, // Remove shadow through props instead of styleOverrides
            },
        },
    },
});

let darkTheme = createTheme(baseDark, {
    shadows: Array(25).fill("none"),
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    backgroundColor: "#121212",
                },
            },
        },
        MuiButton: {
            defaultProps: {
                disableElevation: true, // Remove shadow through props instead of styleOverrides
            },
            styleOverrides: {
                root: {
                    textTransform: "none",
                    boxSizing: "border-box",
                    minHeight: "35px",
                    maxHeight: "35px",
                    lineHeight: "35px",
                    padding: "0 16px",
                },
                containedPrimary: {
                    color: "#fbfbfb", // Set text color to #fbfbfb for primary buttons
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    "& .MuiInputBase-root": {
                        height: "35px",
                    },
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    height: "35px",
                },
                input: {
                    padding: "8px 14px",
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                outlined: {
                    transform: "translate(14px, 8px) scale(1)",
                    "&.MuiInputLabel-shrink": {
                        transform: "translate(14px, -9px) scale(0.75)",
                    },
                },
            },
        },
        MuiPaper: {
            defaultProps: {
                elevation: 0, 
            },
        },
    },
});

// Apply responsive font sizing
lightTheme = responsiveFontSizes(lightTheme);
darkTheme = responsiveFontSizes(darkTheme);

export { lightTheme, darkTheme };
