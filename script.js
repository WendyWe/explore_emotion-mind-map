let selectedNode = null; // 記錄當前選中的方框
let nodeId = 1; // 計數用，生成新方框時會用到

// 初始化心智圖
function initmindmap() {
  const mindmap = document.getElementById('mindMap');
  mindap.innerHTML = ''; // 初始化畫布

  // 初始方框示例
  const initialNode = createNode("初始方框", 200, 100);
  mindMap.appendChild(initialNode);
  selectedNode = initialNode; // 將初始方框設為選中的方框
}

// 創建方框函數
function createNode(text, x, y) {
  const node = document.createElement('div');
  node.classList.add('node');
  node.contentEditable = true;
  node.style.left = x + 'px';
  node.style.top = y + 'px';
  node.style.width = "150px";  // 初始化寬度
  node.style.height = "50px";  // 初始化高度
  node.innerText = text;

  // 點擊時將此方框設為選中的方框
  node.addEventListener('click', function() {
    selectedNode = node;
    highlightNode(node);
  });

  makeResizable(node); // 讓方框可以調整大小
  makeDraggable(node); // 讓方框可以移動

  return node;
}

// 高亮選中的方框
function highlightNode(node) {
  const allNodes = document.querySelectorAll('.node');
  allNodes.forEach(n => n.style.border = '1px solid black'); // 清除其他方框的高亮
  node.style.border = '2px solid blue'; // 高亮當前選中的方框
}

// 讓方框可以調整大小
function makeResizable(element) {
  element.style.resize = "both";
  element.style.overflow = "auto";
}

// 讓方框可以移動
function makeDraggable(element) {
  let offsetX = 0, offsetY = 0, initialX = 0, initialY = 0;
  
  element.addEventListener('mousedown', function(e) {
    initialX = e.clientX;
    initialY = e.clientY;
    document.onmousemove = dragElement;
    document.onmouseup = stopDragging;
  });

  function dragElement(e) {
    offsetX = e.clientX - initialX;
    offsetY = e.clientY - initialY;
    initialX = e.clientX;
    initialY = e.clientY;

    element.style.left = (element.offsetLeft + offsetX) + "px";
    element.style.top = (element.offsetTop + offsetY) + "px";
  }

  function stopDragging() {
    document.onmousemove = null;
    document.onmouseup = null;
  }
}

// 新增方框按鈕功能（單純新增方框）
document.getElementById('addNode').addEventListener('click', function() {
    const newNode = createNode("新增方框 " + nodeId, 300, 150);
    document.getElementById('mindmap').appendChild(newNode);
    nodeId++;
  });

// 新增並連接方框按鈕功能
document.getElementById('addAndConnectNode').addEventListener('click', function() {
  if (selectedNode) {
    const newNode = createNode("新增方框 " + nodeId, parseInt(selectedNode.style.left) + 150, parseInt(selectedNode.style.top) + 50);
    document.getElementById('mindmap').appendChild(newNode);
    nodeId++;

    // 創建連接線
    createConnection(selectedNode, newNode);
  } else {
    alert("請先選擇一個方框！");
  }
});

// 創建連接線
function createConnection(fromNode, toNode) {
  const line = document.createElement('div');
  line.classList.add('line');
  
  // 計算連接線的起點和終點
  const fromRect = fromNode.getBoundingClientRect();
  const toRect = toNode.getBoundingClientRect();

  const x1 = fromRect.left + fromRect.width / 2;
  const y1 = fromRect.top + fromRect.height / 2;
  const x2 = toRect.left + toRect.width / 2;
  const y2 = toRect.top + toRect.height / 2;

  const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;

  line.style.width = length + 'px';
  line.style.transform = `rotate(${angle}deg)`;
  line.style.position = 'absolute';
  line.style.transformOrigin = '0 0';
  line.style.left = x1 + 'px';
  line.style.top = y1 + 'px';

  document.getElementById('mindmap').appendChild(line);
}

// 初始化心智圖
initmindmap();
