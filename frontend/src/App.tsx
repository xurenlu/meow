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

import {clojure} from '@codemirror/legacy-modes/mode/clojure';
import {css} from '@codemirror/legacy-modes/mode/css'
import {diff} from '@codemirror/legacy-modes/mode/diff'
import {d} from '@codemirror/legacy-modes/mode/d'
import {dockerFile} from '@codemirror/legacy-modes/mode/dockerfile'
import {erlang} from '@codemirror/legacy-modes/mode/erlang'
import {go} from '@codemirror/legacy-modes/mode/go';
import {groovy} from '@codemirror/legacy-modes/mode/groovy'
import {java} from '@codemirror/lang-java';
import {javascript} from '@codemirror/lang-javascript';
import {lua} from '@codemirror/legacy-modes/mode/lua'
import {nginx} from '@codemirror/legacy-modes/mode/nginx'
import {perl} from '@codemirror/legacy-modes/mode/perl'
import {powerShell} from '@codemirror/legacy-modes/mode/powershell'
import {protobuf} from '@codemirror/legacy-modes/mode/protobuf'
import {python} from '@codemirror/legacy-modes/mode/python'
import {ruby} from '@codemirror/legacy-modes/mode/ruby'
import {rust} from '@codemirror/legacy-modes/mode/rust'
import {shell} from '@codemirror/legacy-modes/mode/shell'
import {swift} from '@codemirror/legacy-modes/mode/swift'
import {xml} from '@codemirror/legacy-modes/mode/xml'
import {yaml} from '@codemirror/legacy-modes/mode/yaml'
import {html} from '@codemirror/lang-html'
import {cpp} from '@codemirror/lang-cpp'
import {json} from '@codemirror/lang-json'
import {markdown} from '@codemirror/lang-markdown'
import {php} from '@codemirror/lang-php'
import {EventsOn} from "../wailsjs/runtime";


function App() {
    const [resultText, setResultText] = useState("Please enter your name below 👇");
    const [code,setCode] =useState( "");//#hello world\n```java\nclass H extends B {\n public void { println('hello world');\n } \n}\n```\n\n"
    const langMap = {
        clojure: StreamLanguage.define(clojure),
        cpp: cpp(),
        css: StreamLanguage.define(css),
        d: StreamLanguage.define(d),
        diff: StreamLanguage.define(diff),
        dockerFile: StreamLanguage.define(dockerFile),
        erlang: StreamLanguage.define(erlang),
        go: StreamLanguage.define(go),
        groovy: StreamLanguage.define(groovy),

        html: html(),
        java: java().language,
        json: json(),
        javascript: javascript({jsx: true}),
        lua: StreamLanguage.define(lua),
        nginx: StreamLanguage.define(nginx),
        php: php(),
        python: StreamLanguage.define(python),
        protobuf: StreamLanguage.define(protobuf),
        ruby: StreamLanguage.define(ruby),
        perl: StreamLanguage.define(perl),
        powerShell: StreamLanguage.define(powerShell),
        rust: StreamLanguage.define(rust),
        shell: StreamLanguage.define(shell),
        swift: StreamLanguage.define(swift),
        xml: StreamLanguage.define(xml),
        yaml: StreamLanguage.define(yaml)
    }

            //@ts-ignore
    langMap.markdown = markdown({
        defaultCodeLanguage:java(),
        //@ts-ignore
        codeLanguages:(lang:string)=>{
            //@ts-ignore
            if(langMap[lang]){
                //@ts-ignore
                return langMap[lang]
            }
            return java()
        }
    });
    //@ts-ignore
    const [exts, setExts] = useState(langMap.markdown)

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
                .use(rehypeHighlight, {subset: false, plainText: ['txt', 'text','mermaid']})
                .process(afterMatter.content);
            setHtml(file.toString());
            setTimeout(()=>{
                insertMacBar()
            },10)
        },200)

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
