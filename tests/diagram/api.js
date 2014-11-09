(function() {
    var tolerance = 0.0001,
        dataviz = kendo.dataviz,
        Point = dataviz.diagram.Point,
        Rect = dataviz.diagram.Rect,
        diagram;

    function createDiagram() {
        diagram = $('<div id="diagram" />')
            .appendTo(QUnit.fixture)
            .kendoDiagram({
                shapes: [{
                    id: "rect",
                    type: "Rectangle",
                    x: 0,
                    y: 0,
                    width: 100,
                    height: 100
                },{
                    id: "rect1",
                    type: "Rectangle",
                    x: 200,
                    y: 200,
                    width: 100,
                    height: 100
                }]
            })
            .getKendoDiagram();

        return diagram;
    }

    /*-----------------------------------------------*/
    module("Diagram API / selectAll", {
        setup: function () {
            createDiagram();
        },
        teardown: function () {
            diagram.destroy();
        }
    });

    test("select all items", function () {
        diagram.selectAll();
        $.each(diagram.shapes, function(index, item) {
            ok(this.isSelected);
        });
    });

    /*-----------------------------------------------*/
    module("Diagram API / select", {
        setup: function () {
            createDiagram();
        },
        teardown: function () {
            diagram.destroy();
        }
    });

    test("select all items from an array", function () {
        diagram.select(diagram.shapes);

        $.each(diagram.shapes, function() {
            ok(this.isSelected);
        });
    });

    test("select an item", function () {
        diagram.select(diagram.shapes[0]);

        ok(diagram.shapes[0].isSelected);
    });

    test("without parametters return all selected items", function () {
        diagram.select(diagram.shapes[0]);
        var items = diagram.select();

        deepEqual(diagram.shapes[0], items[0]);
    });

    /*-----------------------------------------------*/
    module("Diagram API / selectArea", {
        setup: function () {
            createDiagram();
        },
        teardown: function () {
            diagram.destroy();
        }
    });

    test("select all items in an area", function () {
        diagram.selectArea(new Rect(0, 0, 100, 100));
        ok(diagram.shapes[0].isSelected);
        ok(!diagram.shapes[1].isSelected);
    });

    /*-----------------------------------------------*/
    module("Diagram API / deselect", {
        setup: function () {
            createDiagram();
            diagram.selectAll();
        },
        teardown: function () {
            diagram.destroy();
        }
    });

    test("deselect all array items", function () {
        diagram.deselect(diagram.shapes);
        $.each(diagram.shapes, function() {
            ok(this.isSelected === false);
        });
    });

    test("deselect item", function () {
        var item = diagram.shapes[0]
        diagram.deselect(item);
        ok(item.isSelected === false);
    });

    test("deselect all items", function () {
        diagram.deselect();
        $.each(diagram.shapes, function() {
            ok(this.isSelected === false);
        });
    });

    /*-----------------------------------------------*/
    module("Diagram API / export", {
        setup: function () {
            createDiagram();
        },
        teardown: function () {
            kendo.destroy(QUnit.fixture);
        }
    });

    test("Does not define svg legacy method", function() {
        ok(!diagram.svg);
    });

    test("Does not define imageDataUrl legacy method", function() {
        ok(!diagram.imageDataURL);
    });

    exportTests("Diagram", createDiagram);
})();
