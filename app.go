package main

import (
	"context"
	"fmt"
	"github.com/wailsapp/wails/v2/pkg/runtime"
	"io/fs"
	"io/ioutil"
	"log"
	"time"
)

// App struct
type App struct {
	ctx context.Context
}

type OpenFileRes struct {
	Path    string
	Content string
	Msg     string
}
type SaveRes struct {
	Path string
	Msg  string
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx

}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

func (a *App) OpenFile(msgId string) OpenFileRes {
	current := time.Now().UnixMilli()
	if current <= (lastOpen + 400) {
		return OpenFileRes{
			Path: "",
			Msg:  "duplicate msg",
		}
	}
	lastOpen = current
	log.Println("try to open file,msgId:", msgId)
	log.Printf("time,%v\n", time.Now().UnixMilli())
	dialog, err := runtime.OpenFileDialog(a.ctx, runtime.OpenDialogOptions{})
	log.Println("file opend,%v", dialog)
	if err != nil {
		log.Println("open file failed")
		return OpenFileRes{
			Path: "",
			Msg:  "open file failed",
		}
	}
	content, err := ioutil.ReadFile(dialog)
	log.Println("read file done")
	if err != nil {
		log.Println("read file failed")
		return OpenFileRes{
			Path: "",
			Msg:  "read file failed",
		}
	}
	log.Printf("return content:%v\n", string(content))
	return OpenFileRes{
		Path:    dialog,
		Content: string(content),
		Msg:     "",
	}
}
func (a *App) SaveAs(content string) SaveRes {
	current := time.Now().UnixMilli()
	if current <= (lastSaveAs + 400) {
		return SaveRes{
			Path: "",
			Msg:  "duplicate msg",
		}
	}
	lastSaveAs = current

	log.Println("time,%v", time.Now().UnixMilli())
	log.Println("saveAs called")
	dialog, err := runtime.SaveFileDialog(a.ctx, runtime.SaveDialogOptions{})
	if err != nil {
		return SaveRes{
			Path: "",
			Msg:  err.Error(),
		}
	}
	err = ioutil.WriteFile(dialog, []byte(content), fs.FileMode(0660))
	if err != nil {
		return SaveRes{
			Path: "",
			Msg:  err.Error(),
		}
	}
	return SaveRes{
		Path: dialog,
		Msg:  "",
	}

}
