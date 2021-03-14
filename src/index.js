// (() => {

function SelectBoxGame() {
  const { createElement, selector, selectorAll } = utils;

  this.levelConfigs = gameConfig.levelConfigs;
  this.currentLevel = 0;
  this.gameTimer = null;
  this.levelTimeCounter = null;
  this.scoreCount = 0;
  this.lastLitId = null;

  this.createGridComponent = (id, gridClass) => {
    return createElement("div", { id: "grid-item-" + id, "data-grid-id": id, class: "grid-item " + gridClass });
  };

  this.setLevelTimerCounter = (counter) => {
    this.levelTimeCounter = counter;
    selector("#time").innerHTML = this.levelTimeCounter / 1000 + "s";
  };

  this.setCurrentLevel = (newLevel) => {
    this.setLevelTimerCounter(0);
    this.currentLevel = newLevel;
  };

  this.setScore = (score) => {
    this.scoreCount = score;
    selector("#score").innerHTML = this.scoreCount;
  };

  this.listenGridItemClick = () => {
    selector("#grid-root").addEventListener("click", (e) => {
      const target = e.target;
      console.log("target.className", target.className);
      if (target.className.search("grid-item") != -1) {
        const id = target.getAttribute("data-grid-id");
        const background = target.style.background;
        // TODO[A]: handle multiple click in wrong box
        if (id === this.lastLitId) return;
        if (background === "rgb(116, 134, 224)") {
          this.setScore(this.scoreCount + 1);
        } else {
          this.setScore(this.scoreCount - 1);
        }
      }
    });
  };

  this.createGrid = () => {
    const { levelConfigs, currentLevel } = this;
    const currentLevelConfig = levelConfigs[currentLevel];
    const { levelName, gridSize, gridClass } = currentLevelConfig;
    selector("#level").innerHTML = levelName;
    selector("#grid-root").innerHTML = "";
    for (let i = 1; i <= gridSize * gridSize; i++) {
      const gridItem = this.createGridComponent(i, gridClass);
      selector("#grid-root").appendChild(gridItem);
      if (i % gridSize === 0) {
        selector("#grid-root").appendChild(createElement("div", { class: "line-break" }));
      }
    }
  };

  this.checkLevelTimer = () => {
    const { levelConfigs, currentLevel, levelTimeCounter, scoreCount } = this;
    const currentLevelConfig = levelConfigs[currentLevel];
    if (levelTimeCounter >= currentLevelConfig.levelDuration) {
      // TODO[A]: fix this login

      if (scoreCount >= currentLevelConfig.levelPassingScore) {
        if (currentLevel > levelConfigs.length) {
          clearInterval(this.gameTimer);
          alert("you won");
        } else {
          this.startLevel(currentLevel + 1);
        }
      } else {
        clearInterval(this.gameTimer);
        alert("try again");
        this.startLevel(0);
      }
    } else {
      this.setLevelTimerCounter(this.levelTimeCounter + 1000);
    }
  };

  this.updateLit = () => {
    const { levelConfigs, currentLevel } = this;
    const currentLevelConfig = levelConfigs[currentLevel];

    if (this.lastLitId) {
      selector("#grid-item-" + this.lastLitId).style.background = "#3EC9CA";
    }
    const litId = Math.floor(Math.random() * (currentLevelConfig.gridSize * currentLevelConfig.gridSize)) + 1;
    this.lastLitId = litId;
    selector("#grid-item-" + litId).style.background = "#7486E0";
  };

  this.updateAndCheckTimer = () => {
    this.checkLevelTimer();
    this.updateLit();
  };

  this.startGameTimer = () => {
    if (this.gameTimer) {
      clearInterval(this.gameTimer);
    }
    const { levelConfigs, currentLevel } = this;
    const currentLevelConfig = levelConfigs[currentLevel];
    this.gameTimer = setInterval(() => {
      this.updateAndCheckTimer();
    }, currentLevelConfig.cellLitDuration);
  };

  this.startLevel = (level) => {
    this.lastLitId = null;
    this.setCurrentLevel(level);
    this.setScore(0);
    this.startGameTimer();
    this.createGrid();
  };

  this.init = () => {
    this.startLevel(0);
    this.listenGridItemClick();
  };
}

// Create Select Box Game object
const selectBoxGame = new SelectBoxGame();
selectBoxGame.init();
// })();

SelectBoxGame();
