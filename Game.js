class Position {
    constructor(row, col) {
        this.row = row;
        this.col = col;
    }
    get Row() {
        return this.row;
    }
    get Col() {
        return this.col;
    }
    set Row(value) {
        this.row = value;
    }
    set Col(value) {
        this.col = value;
    }
}
let TotalScore = 0;
class Data {
    constructor(id, view, object) {
        this.id = id;
        this.view = view;
        this.object = object;
    }
    get Id() {
        return this.id;
    }
    get View() {
        return this.view;
    }
    get Object() {
        return this.object;
    }
    set Id(value) {
        this.id = value;
    }
    set View(value) {
        this.view = value;
    }
    set Object(value) {
        this.object = value;
    }
}
class GridItem {
    constructor(row, col) {
        this.position = new Position(row, col);
        this.id = `grid_item_${this.position.Row}_${this.position.Col}`;
        this.DataList = new Array();
        this.view = document.createElement('div');
        this.view.id = this.id;
    }
    get View() {
        return this.view;
    }
    set View(value) {
        this.view = value;
    }
    Set(value) {
        if (value != null || value != undefined) {
            this.DataList.push(value);
            document.getElementById(this.id).innerHTML = value.Data.View.outerHTML;
        }
    }
    Append(value) {
        if (value != null || value != undefined) {
            this.DataList.push(value);
            document.getElementById(this.id).innerHTML += value.Data.view.outerHTML;
            //this.view.innerHTML+=value.Data.view.innerHTML;
        }
    }
    Remove(value) {
        if (value != null || value != undefined) {
            var data = this.DataList.find(x => {
                if (x.Data.Id === value.Data.Id)
                    return true;
            });
            if (data != null || data !== undefined) {
                this.DataList.pop();
            }
        }
    }
    IsEmpty() {
        return this.DataList.length === 0 ? true : false;
    }
    GetData(id) {
        if (id != null || id != undefined) {
            var data = this.DataList.find((x)=>{
                if(x.Data.Id===id)
                return true;
            });
            console.log('Get data ',data);
            if (data != null || data != undefined) {
                return data;
            }
        }
    }
}
class Stock {
    constructor(row, col, capacity) {
        this.position = new Position(row, col);
        this.capacity = capacity;
        this.count = capacity;
        this.id = id = `stock_${row}_${col}`;
        var id = id;
        var div = document.createElement('div');
        div.id = id;
        div.innerHTML = `${this.count}/${this.capacity}`;
        div.className = 'Stock';
        this.data = new Data(id, div, this);
    }
    get Position() {
        return this.position;
    }
    set Position(value) {
        this.position = value;
    }
    get Data() {
        return this.data;
    }
    set Data(value) {
        this.data = value;
    }
    get Count() {
        return this.count;
    }
    get Capacity() {
        return this.capacity;
    }
    set Count(value) {
        if (value >= 0)
            this.count = value;
    }
    Update() {
        document.getElementById(this.id).innerHTML = `${this.count}/${this.capacity}`;
    }
}
class Storage {
    constructor(row, col) {
        this.position = new Position(row, col);
        this.count = 0;
        this.id = `storage_${row}_${col}`;
        var id = this.id;
        var div = document.createElement('div');
        div.id = id;
        div.innerHTML = `Count ${this.count}`;
        div.className = 'Storage';
        this.data = new Data(id, div, this);
    }
    get Position() {
        return this.position;
    }
    set Position(value) {
        this.position = value;
    }
    get Data() {
        return this.data;
    }
    set Data(value) {
        this.data = value;
    }
    get Count() {
        return this.count;
    }

    set Count(value) {
        this.count = value;
    }
    Update() {
        document.getElementById(this.id).innerHTML = `Count ${this.count}`;
    }
}
class Player {
    constructor(row, col, maxBag) {
        this.position = new Position(row, col);
        this.lastPostion = new Position(row, col);
        this.id = id = `player`;
        var id = id;
        var div = document.createElement('div');
        div.id = id;
        div.innerHTML = `Player`;
        div.className = 'Player';
        this.data = new Data(id, div, this);
        this.BagCapaciity = maxBag;
        this.BagCount = 0;
        this.Bag = `bag ${this.BagCount}/${this.BagCapaciity}`;
        document.getElementById('bag').innerHTML = this.Bag;
    }
    get Data() {
        return this.data;
    }
    set Data(value) {
        this.data = value;
    }
    get Position() {
        return this.position;
    }
    set Position(value) {
        this.position = value;
    }
    RemoveLastPosition(gridItem) {
        gridItem.Remove(this);
        document.getElementById(this.id).outerHTML = '';
    }
    MoveToRight(grid) {
        if (this.position.Col < grid.ColCount - 1) {
            this.position.Col++;
            this.RemoveLastPosition(grid.Get(this.position.Row, this.position.Col));
            if (grid.Get(this.position.Row, this.position.Col).IsEmpty()) {
                grid.Set(this.position.Row, this.position.Col, this);
            }
            else {
                grid.Get(this.position.Row, this.position.Col).Append(this);
            }
            this.lastPostion = this.position;
        }
    }
    MoveToDown(grid) {
        if (this.position.Row < grid.RowCount - 1 || (this.position.Col == grid.ColCount - 1 && this.position.Row < grid.RowCount)) {
            this.position.Row++;
            this.RemoveLastPosition(grid.Get(this.position.Row, this.position.Col));
            if (grid.Get(this.position.Row, this.position.Col).IsEmpty()) {
                grid.Set(this.position.Row, this.position.Col, this);
            }
            else {
                grid.Get(this.position.Row, this.position.Col).Append(this);
            }
            this.lastPostion = this.position;
        }
    }
    MoveToUp(grid) {
        if (this.position.Row > 0) {
            this.position.Row--;
            this.RemoveLastPosition(grid.Get(this.position.Row, this.position.Col));
            if (grid.Get(this.position.Row, this.position.Col).IsEmpty()) {
                grid.Set(this.position.Row, this.position.Col, this);
            }
            else {
                grid.Get(this.position.Row, this.position.Col).Append(this);
            }
            this.lastPostion = this.position;
        }
    }
    MoveToLeft(grid) {
        if (this.position.Col > 0 && this.position.Row < grid.RowCount) {
            this.position.Col--;
            this.RemoveLastPosition(grid.Get(this.position.Row, this.position.Col));
            if (grid.Get(this.position.Row, this.position.Col).IsEmpty()) {
                grid.Set(this.position.Row, this.position.Col, this);
            }
            else {
                grid.Get(this.position.Row, this.position.Col).Append(this);
            }
            this.lastPostion = this.position;
        }
    }
    Take(grid) {
        var result = false;
        if (grid.Get(this.position.Row, this.position.Col).IsEmpty() == false) {
            if (grid.Get(this.position.Row, this.position.Col).GetData(`stock_${this.position.Row}_${this.position.Col}`) != null) {
                result = grid.Get(this.position.Row, this.position.Col).GetData(`stock_${this.position.Row}_${this.position.Col}`).Data.Object instanceof Stock;
                if (result) {
                    var count = grid.Get(this.position.Row, this.position.Col).GetData(`stock_${this.position.Row}_${this.position.Col}`).Data.Object.Count;
                    var capacity = grid.Get(this.position.Row, this.position.Col).GetData(`stock_${this.position.Row}_${this.position.Col}`).Data.Object.Capacity;
                    if (this.BagCount < this.BagCapaciity) {
                        if (capacity >= count) {       
                            this.BagCount++;                    
                            grid.Get(this.position.Row, this.position.Col).GetData(`stock_${this.position.Row}_${this.position.Col}`).Data.Object.Count--;
                            grid.Get(this.position.Row, this.position.Col).GetData(`stock_${this.position.Row}_${this.position.Col}`).Data.Object.Update();
                        }
                    }
                    
                    document.getElementById('bag').innerHTML = `bag ${this.BagCount}/${this.BagCapaciity}`;
                }
            }
            else {
                result = grid.Get(this.position.Row, this.position.Col).GetData(`storage_${this.position.Row}_${this.position.Col}`).Data.Object instanceof Storage;
                if (result) {
                    console.log(this.BagCount < TotalScore,' ',this.BagCount,' ',TotalScore,' ');     
                    if (this.BagCount>0) {
                            this.BagCount--;               

                            document.getElementById('bag').innerHTML = `bag ${this.BagCount}/${this.BagCapaciity}`;      
                            grid.Get(this.position.Row, this.position.Col).GetData(`storage_${this.position.Row}_${this.position.Col}`).Data.Object.Count++;
                            grid.Get(this.position.Row, this.position.Col).GetData(`storage_${this.position.Row}_${this.position.Col}`).Data.Object.Update();
                            if(grid.Get(this.position.Row, this.position.Col).GetData(`storage_${this.position.Row}_${this.position.Col}`).Data.Object.Count == TotalScore)
                            {
                            alert('Your score: '+TotalScore);
                            document.getElementById('GridContainer').hidden=true;
                            document.getElementById('StartMenu').style.display='block';  
                            }     
                    }
                }
            }
        }
    }
}

class Grid {
    constructor(rows, cols) {
        this.rowCount = rows;
        this.colCount = cols;
        this.items = new Array(rows + 1);
        this.view = document.getElementById('grid');
        this.view.innerHTML = '';
        for (let i = 0; i < rows; i++) {
            this.items[i] = new Array(cols);
            var row = document.createElement('tr');
            for (let j = 0; j < cols; j++) {
                var col = document.createElement('td');
                col.className = 'GridItem';
                this.items[i][j] = new GridItem(i, j);
                col.innerHTML = this.items[i][j].View.outerHTML;
                row.innerHTML += col.outerHTML;
            }
            this.view.innerHTML += row.outerHTML;
            row = '';
        }
        var lastRow = document.createElement('tr');
        for (let i = 0; i < cols - 1; i++) {
            var col = document.createElement('td');
            lastRow.innerHTML += col.outerHTML;
        }
        var lastColumn = document.createElement('td');
        lastColumn.className = 'GridItem';
        this.items[rows] = new Array(cols);
        this.items[rows][cols - 1] = new GridItem(rows, cols - 1);
        lastColumn.innerHTML = this.items[rows][cols - 1].View.outerHTML;
        lastRow.innerHTML += lastColumn.outerHTML;
        document.getElementById('grid').innerHTML += lastRow.outerHTML;
        this.items[rows][cols - 1].Set(new Storage(rows, cols - 1));
    }
    Get(row, col) {
        return this.items[row][col];
    }
    Set(row, col, value) {
        this.items[row][col].Set(value);
    }

    GenerateStock(maxCount, maxCapacity) {
        var max = maxCount;
        var itemCounnter = 0;
        while (itemCounnter != max) {
            var row = Math.floor(Math.random() * this.rowCount);
            var col = Math.floor(Math.random() * this.colCount);
            var capacity = Math.floor(Math.random() * maxCapacity);
            capacity = capacity == 0 ? 1 : capacity;
            if (this.Get(row, col).IsEmpty()) {
                this.items[row][col].Set(new Stock(row, col, capacity, capacity));
                itemCounnter++;
                TotalScore += capacity;
            }
        }
        console.log('max=' + max);
        console.log('target=',TotalScore);
    }
    get RowCount() {
        return this.rowCount;
    }
    get ColCount() {
        return this.colCount;
    }
}
class Game {
    constructor(rows, cols, count, capacity, maxBag) {
        TotalScore=0;
        this.grid = new Grid(rows, cols);
        this.player = new Player(0, 0, maxBag);
        this.grid.Set(0, 0, this.player);
        this.grid.GenerateStock(count, capacity);
        document.getElementById('body').addEventListener('keydown', this.PlayerMove.bind(this), false)

    }
    PlayerMove() {
        if (event.key === 'ArrowRight') {
            this.player.MoveToRight(this.grid);
        }
        if (event.key === 'ArrowLeft') {
            this.player.MoveToLeft(this.grid);
        }
        if (event.key === 'ArrowDown') {
            this.player.MoveToDown(this.grid);
        }
        if (event.key === 'ArrowUp') {
            this.player.MoveToUp(this.grid);
        }
        if (event.keyCode === 32) {
            this.player.Take(this.grid);
        }
    }
}

function Start() {
    var game = new Game(document.getElementById('rows').value, document.getElementById('cols').value, document.getElementById('stocks').value, document.getElementById('capacity').value, document.getElementById('maxBag').value);
    document.getElementById('StartMenu').style.display = 'none';
    document.getElementById('GridContainer').hidden=false;
}