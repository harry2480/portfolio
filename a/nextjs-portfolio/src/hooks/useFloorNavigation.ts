import { useCallback } from 'react'
import gsap from 'gsap'

export const useFloorNavigation = (
  currentFloor: number,
  setCurrentFloor: (floor: number) => void,
  isAnimating: boolean,
  setIsAnimating: (animating: boolean) => void
) => {
  const goToFloor = useCallback((targetFloor: number) => {
    if (isAnimating || targetFloor === currentFloor) return
    
    setIsAnimating(true)

    const floorDisplay = document.getElementById('floor-number-display')
    if (!floorDisplay) return

    const tl = gsap.timeline({
      onComplete: () => {
        setIsAnimating(false)
        setCurrentFloor(targetFloor)
      }
    })

    tl.to('.elevator-door', { scaleX: 1, duration: 0.8, ease: 'expo.inOut' })
    .add(() => {
      gsap.set('.floor-transit-indicator', { opacity: 1 })
    })
    .to(floorDisplay, {
      innerText: targetFloor,
      duration: 1.0,
      snap: { innerText: 1 },
      onUpdate: function() {
        const val = Math.round(parseFloat(this.targets()[0].textContent || '0'))
        floorDisplay.innerText = val.toString().padStart(2, '0')
      },
      ease: 'power1.inOut'
    })
    .to('.floor-transit-indicator', { opacity: 0, duration: 0.2 })
    .to('.elevator-door', { scaleX: 0, duration: 0.8, ease: 'expo.inOut' }, "-=0.8")

  }, [currentFloor, isAnimating, setCurrentFloor, setIsAnimating])

  return { goToFloor }
}
