var assert = require('assert');
var bigint = require('bigint');

exports.create = function () {
    assert.eql(bigint(1337).toString(), '1337');
    assert.eql(bigint('1337').toString(), '1337');
    assert.eql(new bigint('100').toString(), '100');
    assert.eql(
        new bigint('55555555555555555555555555').toString(),
        '55555555555555555555555555'
    );
    
    assert.eql(Number(bigint('1e+100').toString()), 1e+100);
    assert.eql(Number(bigint('1.23e+45').toString()), 1.23e+45);
    for (var i = 0; i < 10; i++) {
        assert.eql(
            bigint('1.23456e+' + i).toString(),
            Math.floor(1.23456 * Math.pow(10,i))
        );
    }
    
    assert.eql(bigint('1.23e-45').toString(), '0');
};

exports.add = function () {
    for (var i = -10; i < 10; i++) {
        for (var j = -10; j < 10; j++) {
            var is = i.toString();
            var js = j.toString();
            var ks = (i + j).toString();
            assert.eql(bigint(i).add(j).toString(), ks);
            assert.eql(bigint(i).add(js).toString(), ks);
            assert.eql(bigint(i).add(bigint(j)).toString(), ks);
        }
    }
    
    assert.eql(
        bigint(
            '201781752444966478956292456789265633588628356858680927185287861892'
            + '9889675589272409635031813235465496971529430565627918846694860512'
            + '1492948268400884893722767401972695174353441'
        ).add(
            '939769862972759638577945343130228368606420083646071622223953046277'
            + '3784500359975110887672142614667937014937371109558223563373329424'
            + '0624814097369771481147215472578762824607080'
        ).toString(),
        '1141551615417726117534237799919494002195048440504752549409240908170367'
        + '41759492475205227039558501334339864668016751861424100681899362117762'
        + '365770656374869982874551457998960521'
    );
};

exports.sub = function () {
    for (var i = -10; i < 10; i++) {
        for (var j = -10; j < 10; j++) {
            var is = i.toString();
            var js = j.toString();
            var ks = (i - j).toString();
            assert.eql(bigint(i).sub(j).toString(), ks);
            assert.eql(bigint(i).sub(js).toString(), ks);
            assert.eql(bigint(i).sub(bigint(j)).toString(), ks);
        }
    }
    
    assert.eql(
        bigint(
            '635849762218952604062459342660379446997761295162166888134051068531'
            + '9813941775949841573516110003093332652267534768664621969514455380'
            + '8051168706779408804756208386011014197185296'
        ).sub(
            '757617343536280696839135295661092954931163607913400460585109207644'
            + '7966483882748233585856350085641718822741649072106343655764769889'
            + '6399869016678013515043471880323279258685478'
        ).toString(),
        '-121767581317328092776675953000713507933402312751233572451058139112815'
        + '25421067983920123402400825483861704741143034417216862503145088348700'
        + '309898604710287263494312265061500182'
    );
};

exports.mul = function () {
    for (var i = -10; i < 10; i++) {
        for (var j = -10; j < 10; j++) {
            var is = i.toString();
            var js = j.toString();
            var ks = (i * j).toString();
            assert.eql(bigint(i).mul(j).toString(), ks);
            assert.eql(bigint(i).mul(js).toString(), ks);
            assert.eql(bigint(i).mul(bigint(j)).toString(), ks);
        }
    }
    
    assert.eql(
        bigint(
            '433593290010590489671135819286259593426549306666324008679782084292'
            + '2446494189019075159822930571858728009485237489829138626896756141'
            + '8738958337632249177044975686477011571044266'
        ).mul(
            '127790264841901718791915669264129510947625523373763053776083279450'
            + '3886212911067061184379695097643279217271150419129022856601771338'
            + '794256383410400076210073482253089544155377'
        ).toString(),
        '5540900136412485758752141142221047463857522755277604708501015732755989'
        + '17659432099233635577634197309727815375309484297883528869192732141328'
        + '99346769031695550850320602049507618052164677667378189154076988316301'
        + '23719953859959804490669091769150047414629675184805332001182298088891'
        + '58079529848220802017396422115936618644438110463469902675126288489182'
        + '82'
    );
    
    assert.eql(
        bigint('10000000000000000000000000000').mul(-123).toString(),
        '-1230000000000000000000000000000'
    );
};

exports.div = function () {
    for (var i = -10; i < 10; i++) {
        for (var j = -10; j < 10; j++) {
            var is = i.toString();
            var js = j.toString();
            var ks = Math.floor(i / j).toString();
            if (ks.match(/^-?\d+$/)) { // ignore exceptions
                assert.eql(bigint(i).div(j).toString(), ks);
                assert.eql(bigint(i).div(js).toString(), ks);
                assert.eql(bigint(i).div(bigint(j)).toString(), ks);
            }
        }
    }
    
    assert.eql(
        bigint(
            '433593290010590489671135819286259593426549306666324008679782084292'
            + '2446494189019075159822930571858728009485237489829138626896756141'
            + '8738958337632249177044975686477011571044266'
        ).div(
            '127790264841901718791915669264129510947625523373763053776083279450'
            + '3886212911067061184379695097643279217271150419129022856601771338'
            + '794256383410400076210073482253089544155377'
        ).toString(),
        '33'
    );
};

exports.abs = function () {
    assert.eql(
        bigint(
            '433593290010590489671135819286259593426549306666324008679782084292'
            + '2446494189019075159822930571858728009485237489829138626896756141'
            + '8738958337632249177044975686477011571044266'
        ).abs().toString(),
        '4335932900105904896711358192862595934265493066663240086797820842922446'
        + '49418901907515982293057185872800948523748982913862689675614187389583'
        + '37632249177044975686477011571044266'
    );
    
    assert.eql(
        bigint(
            '-43359329001059048967113581928625959342654930666632400867978208429'
            + '2244649418901907515982293057185872800948523748982913862689675614'
            + '18738958337632249177044975686477011571044266'
        ).abs().toString(),
        '4335932900105904896711358192862595934265493066663240086797820842922446'
        + '49418901907515982293057185872800948523748982913862689675614187389583'
        + '37632249177044975686477011571044266'
    );
};

exports.neg = function () {
    assert.eql(
        bigint(
            '433593290010590489671135819286259593426549306666324008679782084292'
            + '2446494189019075159822930571858728009485237489829138626896756141'
            + '8738958337632249177044975686477011571044266'
        ).neg().toString(),
        '-433593290010590489671135819286259593426549306666324008679782084292244'
        + '64941890190751598229305718587280094852374898291386268967561418738958'
        + '337632249177044975686477011571044266'
    );
    
    assert.eql(
        bigint(
            '-43359329001059048967113581928625959342654930666632400867978208429'
            + '2244649418901907515982293057185872800948523748982913862689675614'
            + '18738958337632249177044975686477011571044266'
        ).neg().toString(),
        '4335932900105904896711358192862595934265493066663240086797820842922446'
        + '49418901907515982293057185872800948523748982913862689675614187389583'
        + '37632249177044975686477011571044266'
    );
};

exports.neg = function () {
    
};

if (process.argv[1] === __filename) {
    assert.eql = assert.deepEqual;
    Object.keys(exports).forEach(function (ex) {
        exports[ex]();
    });
}