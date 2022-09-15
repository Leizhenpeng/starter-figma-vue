/// <reference types="@figma/plugin-typings" />

figma.showUI(__html__, {
  width: 450,
  height: 600,
});
figma.ui.onmessage = prop => {
  if (prop.type === 'apply-code') {
    figma.ui.resize(400, 400);
    console.log('✅','code was applied');
    if (prop.triggerOne) {
      console.log('🔥','triggerOne was applied', prop.triggerOne);
    }
      figma.notify('notification after execution');
  }

  if (prop.type === 'create-rectangles') {
    const nodes = [] as any;

    for (let i = 0; i < prop.count; i++) {
      const rect = figma.createRectangle();
      rect.x = i * 150;
      rect.fills = [{ type: 'SOLID', color: { r: 1, g: 0.5, b: 0 } }];
      figma.currentPage.appendChild(rect);
      nodes.push(rect);
    }

    figma.currentPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes);

    // This is how figma responds back to the ui
    figma.ui.postMessage({
      type: 'create-rectangles',
      message: `Created ${prop} Rectangles`,
    });
  }
  
  if (prop.type ==='cancel'){
    figma.closePlugin();
  }
};

