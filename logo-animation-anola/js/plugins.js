var drawn__line = anime.timeline({
     easing: 'linear',
     opacity:1,
     direction: 'alternate',
     loop: true
});

drawn__line
     .add({
          targets: '.el-03',
          easing: 'easeInOutQuad',
          duration:700,
          opacity:1,
          translateY:[98,0],
          translateX:[18,0],
     })

     .add({
          targets: '.el-04',
          easing: 'easeInOutQuad',
          opacity:1,
          delay:200,
          duration:800,
          translateY:[16,0],
          translateX:[18,0],
     })
     .add({
          targets: '.el-0',
          opacity:[0,1],
          easing: 'easeInOutQuad',
          duration:1200,
          translateX:[0,115],
     })
     .add({
          targets: '.el-01',
          strokeDashoffset: [anime.setDashoffset, 0],
          easing: 'easeInOutCubic',
          delay:200,
          duration:700
     })
     .add({
          targets: '.el-02',
          strokeDashoffset: [anime.setDashoffset, 0],
          easing: 'easeInOutCubic',
          delay:200,
          duration:400
     })
     .add({
          targets: '.el-04',
          easing: 'linear',
          duration:600
     })
