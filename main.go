package main

import (
	"embed"
	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/menu"
	"github.com/wailsapp/wails/v2/pkg/menu/keys"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/mac"
	"github.com/wailsapp/wails/v2/pkg/runtime"
	"log"
	"os"
)

//go:embed frontend/dist
var assets embed.FS
var app *App
var lastOpen int64 = 0
var lastSaveAs int64 = 0

type Empty struct {
}

func doOpen(cd *menu.CallbackData) {
	log.Println("doOpen")
	runtime.EventsEmit(app.ctx, "pushOpen", Empty{})

}
func doSave(cd *menu.CallbackData) {
	log.Println("doSave")
	runtime.EventsEmit(app.ctx, "pushSave", Empty{})
}
func doFullScreen(cd *menu.CallbackData) {
	runtime.EventsEmit(app.ctx, "pushFullScreen", Empty{})
}
func doToogleDark(cd *menu.CallbackData) {
	runtime.EventsEmit(app.ctx, "pushToogleDark", Empty{})
}
func doToogleSidebar(cd *menu.CallbackData) {
	runtime.EventsEmit(app.ctx, "pushToogleSidebar", Empty{})
}

func main() {
	// Create an instance of the app structure
	f, err := os.OpenFile("/tmp/wails.log", os.O_RDWR|os.O_CREATE|os.O_APPEND, 0644)
	if err != nil {
		log.Fatalf("error opening file: %v,%v", "/tmp/wails.log", err)
	} else {
		defer func(f *os.File) {
			err := f.Close()
			if err != nil {
			}
		}(f)
		log.SetOutput(f)
	}

	args := os.Args
	log.Println("args,%v", args)
	app = NewApp()

	AppMenu := menu.NewMenu()
	FileMenu := AppMenu.AddSubmenu("File")
	FileMenu.AddText("&Open", keys.CmdOrCtrl("O"), doOpen)
	FileMenu.AddText("&Save", keys.CmdOrCtrl("S"), doSave)
	FileMenu.AddText("FullScreen Toggle", keys.CmdOrCtrl("8"), doFullScreen)
	FileMenu.AddText("Dark/Light Toggle", keys.CmdOrCtrl("9"), doToogleDark)
	FileMenu.AddText("SideBar Toggle", keys.CmdOrCtrl("0"), doToogleSidebar)

	FileMenu.AddSeparator()
	FileMenu.AddText("Quit", keys.CmdOrCtrl("q"), func(_ *menu.CallbackData) {
		runtime.Quit(app.ctx)
	})

	AppMenu.Append(menu.EditMenu()) // on macos platform, we should append EditMenu to enable Cmd+C,Cmd+V,Cmd+Z... shortcut

	// Create application with options
	err = wails.Run(&options.App{
		Title:            "Meow",
		Width:            1024,
		Height:           768,
		Menu:             AppMenu,
		Assets:           assets,
		CSSDragProperty:  "--wails-draggable",
		CSSDragValue:     "drag",
		BackgroundColour: &options.RGBA{R: 27, G: 38, B: 54, A: 1},
		OnStartup:        app.startup,
		Bind: []interface{}{
			app,
		},
		Mac: &mac.Options{
			Appearance: mac.NSAppearanceNameAccessibilityHighContrastDarkAqua,
		},
	})

	if err != nil {
		println("Error:", err.Error())
	}
}
