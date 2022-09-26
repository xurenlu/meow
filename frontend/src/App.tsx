import {createRef, useEffect, useState} from 'react';
import './App.css';

import  matter from 'gray-matter-browser';
import {unified} from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import rehypeHighlight from 'rehype-highlight'
import {
    Box,
    Button,
    Grid,
    GridItem,
    IconButton,
    Input,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    useColorMode
} from '@chakra-ui/react'
import {Greet, OpenFile, SaveAs} from "../wailsjs/go/main/App";
import {FiEdit} from '@react-icons/all-files/fi/FiEdit'
import {BiCollapse} from '@react-icons/all-files/bi/BiCollapse'
import {BiAdjust} from '@react-icons/all-files/bi/BiAdjust'
import {BiImage} from '@react-icons/all-files/bi/BiImage'
import {BiMusic} from '@react-icons/all-files/bi/BiMusic'
import {BiExpand} from '@react-icons/all-files/bi/BiExpand'
import {BiSidebar} from '@react-icons/all-files/bi/BiSidebar'
import {BiMenu} from "@react-icons/all-files/bi/BiMenu";
import {BiSearch} from '@react-icons/all-files/bi/BiSearch'
import {IoAddCircle} from '@react-icons/all-files/io5/IoAddCircle'
import {IoDocumentOutline} from "@react-icons/all-files/io5/IoDocumentOutline"
import CodeMirror, {ReactCodeMirrorRef} from '@uiw/react-codemirror';
import {StreamLanguage} from '@codemirror/language';
import {githubDark, githubLight} from '@uiw/codemirror-theme-github';


import sql from 'highlight.js/lib/languages/sql'
import erlang from 'highlight.js/lib/languages/erlang'
import basic from 'highlight.js/lib/languages/basic'
import dsconfig from 'highlight.js/lib/languages/dsconfig'
import rsl from 'highlight.js/lib/languages/rsl'
import lisp from 'highlight.js/lib/languages/lisp'
import qml from 'highlight.js/lib/languages/qml'
import go from 'highlight.js/lib/languages/go'
import nestedtext from 'highlight.js/lib/languages/nestedtext'
import hy from 'highlight.js/lib/languages/hy'
import vhdl from 'highlight.js/lib/languages/vhdl'
import dos from 'highlight.js/lib/languages/dos'
import typescript from 'highlight.js/lib/languages/typescript'
import d from 'highlight.js/lib/languages/d'
import groovy from 'highlight.js/lib/languages/groovy'
import leaf from 'highlight.js/lib/languages/leaf'
import fortran from 'highlight.js/lib/languages/fortran'
import xml from 'highlight.js/lib/languages/xml'
import flix from 'highlight.js/lib/languages/flix'
import rust from 'highlight.js/lib/languages/rust'
import cpp from 'highlight.js/lib/languages/cpp'
import arcade from 'highlight.js/lib/languages/arcade'
import shell from 'highlight.js/lib/languages/shell'
import powershell from 'highlight.js/lib/languages/powershell'
import erb from 'highlight.js/lib/languages/erb'
import ini from 'highlight.js/lib/languages/ini'
import lasso from 'highlight.js/lib/languages/lasso'
import parser3 from 'highlight.js/lib/languages/parser3'
import vbnet from 'highlight.js/lib/languages/vbnet'
import stan from 'highlight.js/lib/languages/stan'
import dart from 'highlight.js/lib/languages/dart'
import avrasm from 'highlight.js/lib/languages/avrasm'
import subunit from 'highlight.js/lib/languages/subunit'
import angelscript from 'highlight.js/lib/languages/angelscript'
import gams from 'highlight.js/lib/languages/gams'
import yaml from 'highlight.js/lib/languages/yaml'
import autoit from 'highlight.js/lib/languages/autoit'
import elixir from 'highlight.js/lib/languages/elixir'
import llvm from 'highlight.js/lib/languages/llvm'
import scheme from 'highlight.js/lib/languages/scheme'
import crystal from 'highlight.js/lib/languages/crystal'
import handlebars from 'highlight.js/lib/languages/handlebars'
import wren from 'highlight.js/lib/languages/wren'
import prolog from 'highlight.js/lib/languages/prolog'
import http from 'highlight.js/lib/languages/http'
import scss from 'highlight.js/lib/languages/scss'
import dockerfile from 'highlight.js/lib/languages/dockerfile'
import pf from 'highlight.js/lib/languages/pf'
import taggerscript from 'highlight.js/lib/languages/taggerscript'
import latex from 'highlight.js/lib/languages/latex'
import matlab from 'highlight.js/lib/languages/matlab'
import ruby from 'highlight.js/lib/languages/ruby'
import vbscript from 'highlight.js/lib/languages/vbscript'
import django from 'highlight.js/lib/languages/django'
import mipsasm from 'highlight.js/lib/languages/mipsasm'
import golo from 'highlight.js/lib/languages/golo'
import pony from 'highlight.js/lib/languages/pony'
import ldif from 'highlight.js/lib/languages/ldif'
import axapta from 'highlight.js/lib/languages/axapta'
import apache from 'highlight.js/lib/languages/apache'
import nginx from 'highlight.js/lib/languages/nginx'
import scilab from 'highlight.js/lib/languages/scilab'
import abnf from 'highlight.js/lib/languages/abnf'
import delphi from 'highlight.js/lib/languages/delphi'
import gml from 'highlight.js/lib/languages/gml'
import purebasic from 'highlight.js/lib/languages/purebasic'
import sas from 'highlight.js/lib/languages/sas'
import actionscript from 'highlight.js/lib/languages/actionscript'
import protobuf from 'highlight.js/lib/languages/protobuf'
import c from 'highlight.js/lib/languages/c'
import sml from 'highlight.js/lib/languages/sml'
import smali from 'highlight.js/lib/languages/smali'
import inform7 from 'highlight.js/lib/languages/inform7'
import java from 'highlight.js/lib/languages/java'
import scala from 'highlight.js/lib/languages/scala'
import lsl from 'highlight.js/lib/languages/lsl'
import thrift from 'highlight.js/lib/languages/thrift'
import verilog from 'highlight.js/lib/languages/verilog'
import nsis from 'highlight.js/lib/languages/nsis'
import livescript from 'highlight.js/lib/languages/livescript'
import nim from 'highlight.js/lib/languages/nim'
import javascript from 'highlight.js/lib/languages/javascript'
import excel from 'highlight.js/lib/languages/excel'
import mel from 'highlight.js/lib/languages/mel'
import moonscript from 'highlight.js/lib/languages/moonscript'
import graphql from 'highlight.js/lib/languages/graphql'
import roboconf from 'highlight.js/lib/languages/roboconf'
import ebnf from 'highlight.js/lib/languages/ebnf'
import maxima from 'highlight.js/lib/languages/maxima'
import lua from 'highlight.js/lib/languages/lua'
import monkey from 'highlight.js/lib/languages/monkey'
import julia from 'highlight.js/lib/languages/julia'
import irpf90 from 'highlight.js/lib/languages/irpf90'
import reasonml from 'highlight.js/lib/languages/reasonml'
import dust from 'highlight.js/lib/languages/dust'
import tap from 'highlight.js/lib/languages/tap'
import perl from 'highlight.js/lib/languages/perl'
import coq from 'highlight.js/lib/languages/coq'
import smalltalk from 'highlight.js/lib/languages/smalltalk'
import xl from 'highlight.js/lib/languages/xl'
import makefile from 'highlight.js/lib/languages/makefile'
import cos from 'highlight.js/lib/languages/cos'
import zephir from 'highlight.js/lib/languages/zephir'
import dns from 'highlight.js/lib/languages/dns'
import haskell from 'highlight.js/lib/languages/haskell'
import cal from 'highlight.js/lib/languages/cal'
import nix from 'highlight.js/lib/languages/nix'
import diff from 'highlight.js/lib/languages/diff'
import mercury from 'highlight.js/lib/languages/mercury'
import glsl from 'highlight.js/lib/languages/glsl'
import autohotkey from 'highlight.js/lib/languages/autohotkey'
import mizar from 'highlight.js/lib/languages/mizar'
import coffeescript from 'highlight.js/lib/languages/coffeescript'
import ruleslanguage from 'highlight.js/lib/languages/ruleslanguage'
import vim from 'highlight.js/lib/languages/vim'
import less from 'highlight.js/lib/languages/less'
import ada from 'highlight.js/lib/languages/ada'
import ceylon from 'highlight.js/lib/languages/ceylon'
import clean from 'highlight.js/lib/languages/clean'
import bash from 'highlight.js/lib/languages/bash'
import dts from 'highlight.js/lib/languages/dts'
import asciidoc from 'highlight.js/lib/languages/asciidoc'
import xquery from 'highlight.js/lib/languages/xquery'
import php from 'highlight.js/lib/languages/php'
import awk from 'highlight.js/lib/languages/awk'
import properties from 'highlight.js/lib/languages/properties'
import armasm from 'highlight.js/lib/languages/armasm'
import arduino from 'highlight.js/lib/languages/arduino'
import livecodeserver from 'highlight.js/lib/languages/livecodeserver'
import aspectj from 'highlight.js/lib/languages/aspectj'
import gherkin from 'highlight.js/lib/languages/gherkin'
import r from 'highlight.js/lib/languages/r'
import pgsql from 'highlight.js/lib/languages/pgsql'
import oxygene from 'highlight.js/lib/languages/oxygene'
import csp from 'highlight.js/lib/languages/csp'
import cmake from 'highlight.js/lib/languages/cmake'
import python from 'highlight.js/lib/languages/python'
import fix from 'highlight.js/lib/languages/fix'
import mojolicious from 'highlight.js/lib/languages/mojolicious'
import accesslog from 'highlight.js/lib/languages/accesslog'
import applescript from 'highlight.js/lib/languages/applescript'
import profile from 'highlight.js/lib/languages/profile'
import x86asm from 'highlight.js/lib/languages/x86asm'
import hsp from 'highlight.js/lib/languages/hsp'
import processing from 'highlight.js/lib/languages/processing'
import objectivec from 'highlight.js/lib/languages/objectivec'
import tcl from 'highlight.js/lib/languages/tcl'
import crmsh from 'highlight.js/lib/languages/crmsh'
import kotlin from 'highlight.js/lib/languages/kotlin'
import step21 from 'highlight.js/lib/languages/step21'
import csharp from 'highlight.js/lib/languages/csharp'
import plaintext from 'highlight.js/lib/languages/plaintext'
import json from 'highlight.js/lib/languages/json'
import haml from 'highlight.js/lib/languages/haml'
import clojure from 'highlight.js/lib/languages/clojure'
import haxe from 'highlight.js/lib/languages/haxe'
import sqf from 'highlight.js/lib/languages/sqf'
import swift from 'highlight.js/lib/languages/swift'
import n1ql from 'highlight.js/lib/languages/n1ql'
import bnf from 'highlight.js/lib/languages/bnf'
import rib from 'highlight.js/lib/languages/rib'
import vala from 'highlight.js/lib/languages/vala'
import stylus from 'highlight.js/lib/languages/stylus'
import isbl from 'highlight.js/lib/languages/isbl'
import openscad from 'highlight.js/lib/languages/openscad'
import brainfuck from 'highlight.js/lib/languages/brainfuck'
import routeros from 'highlight.js/lib/languages/routeros'
import ocaml from 'highlight.js/lib/languages/ocaml'
import fsharp from 'highlight.js/lib/languages/fsharp'
import capnproto from 'highlight.js/lib/languages/capnproto'
import puppet from 'highlight.js/lib/languages/puppet'
import mathematica from 'highlight.js/lib/languages/mathematica'
import gradle from 'highlight.js/lib/languages/gradle'
import twig from 'highlight.js/lib/languages/twig'
import wasm from 'highlight.js/lib/languages/wasm'
import css from 'highlight.js/lib/languages/css'
import q from 'highlight.js/lib/languages/q'
import gcode from 'highlight.js/lib/languages/gcode'
import gauss from 'highlight.js/lib/languages/gauss'
import tp from 'highlight.js/lib/languages/tp'
import stata from 'highlight.js/lib/languages/stata'
import elm from 'highlight.js/lib/languages/elm'



import {markdown} from '@codemirror/lang-markdown'
import {EventsOn} from "../wailsjs/runtime";


function App() {
    const [resultText, setResultText] = useState("Please enter your name below 👇");
    const [code,setCode] =useState( "");//#hello world\n```java\nclass H extends B {\n public void { println('hello world');\n } \n}\n```\n\n"


            //@ts-ignore
    const markdownLang = markdown({
    });
    //@ts-ignore
    const [exts, setExts] = useState(markdownLang)

    let timerOpen :number
    EventsOn("pushOpen",(data)=>{
        if(timerOpen){
            clearTimeout(timerOpen)
        }
        setTimeout(()=>{
            doOpen();
            },200)
    })
    let timerSave:number
    EventsOn("pushSave",(data)=>{
        console.log("got event pushSave")
        if(timerSave){
            clearTimeout(timerSave)
        }
        timerSave = setTimeout(()=> {
            doSave();
        },200)
    })
    EventsOn("pushFullScreen",()=>{
        toggleFull()
    })
    EventsOn("pushToogleDark",()=>{
        toogleDark()
    })
    EventsOn("pushToogleSidebar",()=>{
        toggleSplit()
    })




    function doSave(){
        //@ts-ignore

        SaveAs(cmVal).then((res)=>{
            console.log("saveAs Callback in app.ts:")
            console.log(res);
        })

    }
    function doOpen(){

        OpenFile(Math.random()+":").then((res)=>{
            if(res.Msg!=""){
            }else{
                setCmVal(res.Content)
                setCode(res.Content)
            }
        }).catch((err)=>{
            console.log(err)
        })
    }

    function toggleFull() {
            //@ts-ignore

            if(fullscreen){
                setFull(false)
                //@ts-ignore
                window.runtime.WindowUnfullscreen();

                setFullIcon( <BiExpand size={24}/>)
                setHeadDisplay("block")
            }else {

                setFull(true)
                // @ts-ignore
                window.runtime.WindowFullscreen();
                // @ts-ignore
                setFullIcon(<BiCollapse size={24}/>)
                setHeadDisplay("none")
            }

    }


    const [fullIcon,setFullIcon] = useState(<BiExpand size={24}/>)
    const { colorMode, toggleColorMode } = useColorMode()
    const [fullscreen,setFull] = useState(false)
    const [theTheme,setTheTheme] = useState(githubDark)
    useEffect(()=>{
       // @ts-ignore

    })
    function toogleDark(){
        toggleColorMode()
        setTimeout(function(){
            if(colorMode==="light"){
                setTheTheme(githubDark)
                setBgMenu(darkBgMenu)
                setBg("bg/d-03.png")
            }else{
                setTheTheme(githubLight)
                setBgMenu(lightBgMenu)
                setBg("bg/l-01.png")
            }
        },100)
    }

    const cm  = createRef<ReactCodeMirrorRef>()
    const [leftSpan,setLeftSpan] = useState(8)
    const [rightSpan,setRightSpan]  = useState(8)
    const [split,setSplit] = useState(false)
    function toggleSplit() {
        if(leftSpan==16){
            setLeftSpan(8)
            setRightSpan(8)
        }else{
            setLeftSpan(16)
            setRightSpan(1)
        }
    }
    const [htmlString,setHtml]= useState("")
    const [cmVal,setCmVal] = useState("")
    let timer:number
    async function mdChange(value:string){
        //console.log(value)
        if(timer){
            clearTimeout(timer)
        }
        //let afterMatter={content:value}
         let afterMatter = matter(value)
        timer= setTimeout(async()=>{
            setCmVal(value)
            setHtml("")
            const file = await unified()
                .use(remarkParse)
                .use(remarkGfm)
                .use(remarkRehype)
                .use(rehypeStringify)
                .use(rehypeHighlight, {
                    ignoreMissing:true,
                    languages:{
                        basic, java,ruby,python,go,javascript,typescript,
                        erlang,perl,php,bash,less,css,csharp,json,
                        protobuf,c,rust,lisp,d,groovy,fortran,xml,
                        sql,cpp,shell,powershell,erb,ini,vbnet,dart,
                        yaml,elixir,llvm,scss,dockerfile,
                        pf,latex,matlab,vbscript,django,nginx,delphi,
                        actionscript,lua,makefile,zephir,haskell,diff,coffeescript,
                        vim,awk,r,cmake,haml,clojure,kotlin,tcl,swift,
                        brainfuck,puppet,twig,gradle,wasm
                    },
                    plainText: ['txt', 'text','mermaid']})
                .process(afterMatter.content);
            setHtml(file.toString());
            setTimeout(()=>{
                insertMacBar()
            },10)
        },300)

    }


    const createNewMacNode = function (){
        //let node = document.createElement("")
        let newNode = document.createElement("div");
        newNode.classList.add("mac-top-bar","pl-4","text-left","pt-1");
        newNode.innerHTML = "<img src='top.png' style='height:20px;'/>"
        return newNode;
    }
    function insertMacBar(){
        // @ts-ignore
        pida.$("#preview-area pre code").each((item:HTMLElement)=>{
            //console.log(item.classList);
            // if(item.childNodes.length<2){
            //     return
            // }
            //@ts-ignore
            let subs = pida.$(".mac-top-bar",item.parentNode)
            console.log("length",subs.elements.length)
            if(subs.elements.length==0){
                if(!item.classList.contains("language-mermaid")) {
                    // @ts-ignore
                    item.parentNode.insertBefore(createNewMacNode(), item);
                }
            }
        })
        //@ts-ignore
        pida.$("#preview-area table").each((item)=>{
            //@ts-ignore
            if(!item.classList.contains("table-auto")){
                //@ts-ignore
                item.classList.add("table-auto")
            }
        })
    }
    let darkBgs = ["d-04.png"]
    let lightBgs = ["l-01.jpg"]
    let bothBgs = ["b-01.png","b-02.png","b-03.png"]
    let bgs = ["d-02.png","l-02.png" ]
    const genBgMenu = function (item:string){
        return  <MenuItem   key={item}   style={{"height":"110px","width":"190px"}} onClick={chBg}>
            <img src={"https://unhtml.oss-cn-hongkong.aliyuncs.com/static/public/bg/"+item+"??x-oss-process=zip"}  width={190} height={90} style={{"margin":"5px"}}/>
        </MenuItem>
    }
    const darkBgMenu = (darkBgs.concat(bothBgs)).map(genBgMenu)
    const lightBgMenu = (lightBgs.concat(bothBgs)).map(genBgMenu)
    const [theBg,setBg]= useState(darkBgs[darkBgs.length-1])
    const [bgMenu,setBgMenu]  = useState(darkBgMenu)
    function chBg(e:any){
        setBg(e.target.getAttribute("src"))
    }


    function updateAudio(e:any) {
        //@ts-ignore
        pida.$("audio").each((item:any)=>{
            item.pause()
        })
        let elements
        if(e.target.nodeName=="SPAN"){
            //@ts-ignore
            elements = pida.$("audio",e.target.parentNode).elements
        }else{
            //@ts-ignore
            elements = pida.$("audio",e.target).elements
        }
        if(elements.length==1){
            elements[0].play()
        }
    }
    function stopAudio(){
        //@ts-ignore
        pida.$("audio").each((item:any)=>{
            item.pause()
        })
    }

    const [headDisplay,setHeadDisplay] = useState("block")

    const [minHeight,setMinHeight]=useState("400px")
    const [maxHeight,setMaxHeight]=useState("500px")
    function handleResize(){

        let diff = 208
        if(fullscreen){
            diff = 80
        }
        let height = (document.documentElement.clientHeight || document.body.clientHeight) - diff;
        setMinHeight(height+"px")
    }
    useEffect(()=>{
        let height = (document.documentElement.clientHeight || document.body.clientHeight) - 208;
        setMinHeight(height+"px")
        window.addEventListener('resize', handleResize);
    },[])

    return (
        <div id="App" style={{"backgroundImage":"url('"+theBg+"')","backgroundSize":"cover"}}>
            <Grid templateColumns='repeat(3, 1fr)' id={"head-nav"} style={{display:headDisplay}}>
                <GridItem colSpan={2} gap={0} className={"pl-4"} style={{"textAlign":"left"}}>


                 <span style={{"color":"gray","fontSize":"32px"}} className={"inline align-middle"}>

                     Me
    <FiEdit size={20} className={"inline"}/>w
    </span>

                    <Button  className={"inline ml-1 align-middle"}
                             variant='outline'  colorScheme={"facebook"} leftIcon={<IoDocumentOutline size={16}/>} onClick={doOpen}>
                        Open
                    </Button>

                    <Button className={"inline ml-4 mr-2   align-middle"} variant='outline' colorScheme={"facebook"} leftIcon={<IoAddCircle size={16}/>} onClick={doSave}>
                        Save
                    </Button>

                </GridItem>
                <GridItem>

                </GridItem>



            </Grid>

            <Box className={"m-4 mt-1 rounded"} id={"main-area"}>

                <Box className={"rounded-lg"}
                style={{}}>
                    <Box  style={{"textAlign":"right","position":"relative","width":"100%"}}>
                        <Box style={{"width":"100px","right":"10px","top":"10px","position":"absolute"}}>

                            <Menu>
                                <MenuButton
                                    as={IconButton}
                                    aria-label='Options'
                                    icon={<BiMenu size={24}/>}
                                />
                                <MenuList>
                                    <MenuItem  id="fullsc" icon={fullIcon} command='⌘+8' onClick={toggleFull}>
                                    FullScreen
                                    </MenuItem>
                                    <MenuItem icon={<BiAdjust size={24}/>} command='⌘+9' onClick={toogleDark}>
                                        Toogle Dark/Light
                                    </MenuItem>

                                    <MenuItem icon={<BiSidebar size={24}/>} command='⌘+0' onClick={toggleSplit}>
                                    Double Column
                                    </MenuItem>
                                </MenuList>
                            </Menu>

                        </Box>
                        <Box style={{"width":"100px","right":"60px","top":"10px","position":"absolute"}}>
                            <Menu>
                                <MenuButton
                                    as={IconButton}
                                    aria-label='Options'
                                    icon={<BiImage size={24}/>}
                                />
                                <MenuList>
                                    {bgMenu}
                                </MenuList>
                            </Menu>
                        </Box>

                        <Box style={{"width":"100px","right":"110px","top":"10px","position":"absolute"}}>
                            <Menu>
                                <MenuButton
                                    as={IconButton}
                                    aria-label='Options'
                                    icon={<BiMusic size={24}/>}
                                />
                                <MenuList>
                                    <MenuItem onClick={stopAudio}>
                                        muted
                                    </MenuItem>
                                    <MenuItem onClick={updateAudio}>
                                        <span >
                                            bird
                                            <audio crossOrigin={"anonymous"} loop={true}>
                                                <source src={"audio/bird.mp3"}/>
                                            </audio>
                                        </span>
                                    </MenuItem>
                                    <MenuItem onClick={updateAudio}>
                                        <span >
                                            rain
                                              <audio crossOrigin={"anonymous"} loop={true}>
                                                <source src={"audio/rain.mp3"}/>
                                            </audio>
                                        </span>
                                    </MenuItem>
                                </MenuList>
                            </Menu>
                        </Box>




                    </Box>


                    <Grid className={"p-16 rounded-lg"} templateColumns={'repeat(16, 1fr)'}>
                    <GridItem colSpan={leftSpan} gap={16}>
                        <CodeMirror style={{
                            "textAlign": "left",
                            "boxShadow": "5px 5px 150px 5px rgb(50,50,50) ",
                            "borderRadius": "10px",
                            "opacity":0.7
                        }}
                                    minHeight={minHeight}
                                    ref={cm}
                                    className={"rounded"}
                                    maxHeight={maxHeight}
                                    basicSetup={{
                                        lineNumbers: true,
                                        highlightActiveLine: true,
                                        highlightActiveLineGutter: true,
                                        history:true,
                                        dropCursor:true,
                                        foldGutter:true
                                    }}
                                    onChange={mdChange}
                                    theme={theTheme} value={code} extensions={[exts]}
                        />
                    </GridItem>
                    <GridItem id={"preview-area"} style={{
                        "textAlign": "left",
                        "boxShadow": "5px 5px 150px 5px rgb(50,50,50) ",
                        "borderRadius": "10px",
                        "opacity":0.8,
                        "display":(leftSpan==8?"block":"none")
                    }}
                               className={"p-8 ml-8"}
                               colSpan={rightSpan} dangerouslySetInnerHTML={{ __html: htmlString }}>

                    </GridItem>

                    </Grid>
                </Box>

            </Box>

            <br/>
        </div>
    )
}

export default App
