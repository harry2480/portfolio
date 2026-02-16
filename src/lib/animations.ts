/**
 * GSAP Animations Utilities
 * エレベーター遷移とリビールアニメーション
 */

import gsap from 'gsap'

/**
 * フロア遷移アニメーション
 */
export function animateFloorTransition(options: {
  onStart: () => void
  onComplete: () => void
}) {
  const timeline = gsap.timeline({
    onStart: options.onStart,
    onComplete: options.onComplete,
  })

  // エレベーター扉を閉じる
  timeline.to(
    '.elevator-door',
    {
      scaleX: 1,
      duration: 0.8,
      ease: 'expo.inOut',
    },
    0
  )

  // フロア遷移インジケーターを表示
  timeline.to(
    '.floor-transit-indicator',
    {
      opacity: 1,
      duration: 0.3,
    },
    0.2
  )

  // フロア番号をカウント（自動）
  timeline.add('counting', 0.5)

  // 扉を開く
  timeline.to(
    '.elevator-door',
    {
      scaleX: 0,
      duration: 0.8,
      ease: 'expo.inOut',
    },
    1.5
  )

  // インジケーターをフェードアウト
  timeline.to(
    '.floor-transit-indicator',
    {
      opacity: 0,
      duration: 0.2,
    },
    1.5
  )

  return timeline
}

/**
 * テキストリビールアニメーション
 */
export function animateRevealText(element: HTMLElement) {
  const timeline = gsap.timeline()

  timeline.to(
    element.querySelectorAll('.reveal-text'),
    {
      y: 0,
      duration: 1.2,
      ease: 'power4.out',
      stagger: 0.1,
    }
  )

  return timeline
}

/**
 * アイテムリビールアニメーション
 */
export function animateRevealItems(container: HTMLElement) {
  const timeline = gsap.timeline()

  timeline.to(
    container.querySelectorAll('.reveal-item'),
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.1,
    }
  )

  return timeline
}

/**
 * スクロール連動アニメーション（ScrollTrigger 使用）
 */
export function setupScrollAnimations() {
  // ScrollTrigger 機能はここで後に追加可能
}
