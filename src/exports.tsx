"use client";
import { useEffect, useRef } from 'react';

export default function({list, duration}: {list: string[], duration: number}){
    const switcherRef = useRef<HTMLSpanElement>(null);

    useEffect(()=>{
        let position = 0;

        function update(){
            if(switcherRef.current){
                position++;
                if(position === list.length){
                    position = 0;
                }

                //get children
                const children = Array.from(switcherRef.current.children);

                //for each child
                children.forEach((child, index)=>{
                    if (child.className.includes("textSwitcher-invisible")) return;

                    //remove all classes
                    child.className = "";
                    //add the element class
                    child.classList.add("textSwicher-element")
                    //get the place
                    let newPlace = parseInt(child.getAttribute("data-place") || "0") + 1;
                    if (newPlace === list.length) {
                        newPlace = 0;
                    }

                    if (newPlace == 1){
                        //get its width
                        const width = child.getBoundingClientRect().width;
                        //make the switcher the same width
                        switcherRef.current!.style.width = `${width}px`;
                    }

                    //set the new place
                    child.setAttribute("data-place", newPlace.toString());
                    //add the new class
                    child.classList.add(`textSwitcher-e${newPlace}`);
                })
                
            }
        }
        const interval = setInterval(update, duration);
        update()

        return ()=>{
            clearInterval(interval);
        }
    }, [])


    return <span className="textSwitcher-wrapper" ref={switcherRef}>
        {
            list.map((item, index)=>{
                return <span className="textSwitcher-element" data-place={index-1} key={index}>
                    {list[index]}
                </span>
            })
        }
        <span className="textSwitcher-invisible">
            i
        </span>
    </span>
}