import {useState} from 'react'
import {useScrollPosition} from '@n8tb1t/use-scroll-position'
import { useMediaQuery } from 'react-responsive'

export default function useScrollOverpass() {
  const mediumBreakpoint = useMediaQuery({minWidth: 768})
	const [show, setShow] = useState(false)
	const [overpassClassName, setOverpassClassName] = useState('')
	const showClassName = 'bg-purple-900/60 backdrop-blur-md shadow-md'
	const hideClassName = 'opacity-0 transition duration-200'

	useScrollPosition(({prevPos, currPos}) => {
		if(currPos.y > -16) {
			setShow(true)
			setOverpassClassName('')
		}else if(currPos.y > -118) {
			setShow(true)
			setOverpassClassName(showClassName)
		}else if((currPos.y > prevPos.y) != show) {
			setShow(show => {return !show})
			if(show && !mediumBreakpoint) setOverpassClassName(hideClassName)
			if(!show) setOverpassClassName(showClassName)
		}
	}, [show])

	return {overpassClassName, showClassName, hideClassName}
}