export default class Arithmatic {
    constructor() {
    }
    isPrime(n) {
        let prime = true;
        switch (true) {
            case n == 1:
                prime = false;
                break;
            case n < 0:
                prime = undefined;
                break;
            case n >= 2:
                for (let i = 2; i <= Math.floor(Math.sqrt(n)); i++) {
                    if (n % i == 0) {
                        prime = false;
                        break;
                    }
                }
        }
        return prime;
    }
    factorize(number) {
        let factors = [];
        for (let i = 2; i <= Math.floor(number / 2); i++) {
            if (this.isPrime(i) && number % i == 0) {
                factors.push(i);
            }
        }
        return factors;
    }
    // eqGen(target, symb, difficulty) {
    //     let sign = (target < 0) ? -1 : 0;
    //     target = Math.abs(target);
    //     let expr = [];
    //     let symbols = symb;
    //     let factors;
    //     let factor = 1;
    //     let braces = 0;
    //     // console.log('difficulty :--------------- ', symb)
    //     while ((difficulty) > 1 && target > 1) {
    //         switch (symbols[Math.floor((Math.random() * (symbols.length)))]) {
    //             case '*':
    //                 factors = this.factorize(target);

    //                 if (factors.length > 0) {
    //                     factor = factors[Math.floor((Math.random() * (factors.length)))];
    //                 }
    //                 expr.push(parseInt(factor));
    //                 expr.push('*')
    //                 //   expr.push('(')
    //                 braces++
    //                 target /= factor;
    //                 break;
    //             case '+':
    //                 // console.log('case : +')
    //                 factor = Math.floor(target / 2);
    //                 // console.log('factor +', factor)
    //                 expr.push(parseInt(factor));
    //                 expr.push('+')
    //                 // console.log('expr : ', expr)
    //                 //   expr.push('(') 
    //                 braces++
    //                 target -= factor;
    //                 break;
    //             case '/':
    //                 factors = this.factorize(target);

    //                 if (factors.length > 0) {
    //                     factor = factors[Math.floor((Math.random() * (factors.length)))];
    //                 }
    //                 expr.push(target * parseInt(factor));
    //                 expr.push('/')
    //                 //  expr.push('(')
    //                 target = factor;
    //                 braces++;
    //                 break;
    //             case '-':
    //                 // console.log('case : -')
    //                 // console.log('target : ', target);
    //                 factor = Math.floor(Math.random() * ((target / 2) - 3) + 3);
    //                 // console.log('factor - ', factor);
    //                 expr.push((target + parseInt(factor)));
    //                 expr.push('-')
    //                 // console.log('expr : ', expr);
    //                 //  expr.push('(')
    //                 target = factor;
    //                 braces++
    //                 break;
    //         }
    //         difficulty--;
    //     }
    //     expr.push(parseInt(target))
    //     while (braces > 0) {
    //         //   expr.push(')');
    //         braces--;
    //     }
    //     //   console.log('=============================================', '-(' + expr.join(' ') + ')');
    //     return (sign == 0) ? expr.join(' ') : ('-(' + expr.join(' ') + ')');
    // }


    /*     * Generates an equation based on the target value, symbols, and difficulty level.
     * @param {number} target - The target value for the equation.
     * @param {Array} symb - An array of symbols to use in the equation.
     * @param {number} difficulty - The difficulty level of the equation.
     * @returns {string} - The generated equation as a string.
     */

    eqGen(target, symb, difficulty) {
        let sign = (target < 0) ? -1 : 0;
        target = Math.abs(target);
        let expr = [];
        let symbols = symb;
        let factors;
        let factor = 1;
        let braces = 0;
        while ((difficulty) > 1 && target > 1) {
            console.log('difficulty :--------------- ', difficulty, target, symbols);

            switch (symbols[Math.floor((Math.random() * (symbols.length)))]) {
                case '*':
                    factors = this.factorize(target);
                    if (factors.length > 0) {
                        factor = factors[Math.floor((Math.random() * (factors.length)))];
                    }
                    expr.push(factor);
                    expr.push('*')
                    expr.push('(')
                    braces++
                    console.log('factor', factor, target);
                    target /= factor;
                    break;
                case '+':
                    factor = Math.floor(target / 2);
                    expr.push(factor);
                    expr.push('+')
                    expr.push('(')
                    braces++
                    target -= factor;
                    console.log('factor', factor, target);
                    break;
                case '/':
                    factors = this.factorize(target);

                    if (factors.length > 0) {
                        factor = factors[Math.floor((Math.random() * (factors.length)))];
                    }
                    console.log('factor', factor, target);
                    expr.push(target * factor);
                    expr.push('/')
                    expr.push('(')
                    target = factor;
                    braces++;
                    break;
                case '-':
                    factor = Math.floor(Math.random() * (Math.floor(target / 2) - 3) + 3);
                    console.log('factor', factor, target);
                    expr.push((target + factor));
                    expr.push('-')
                    expr.push('(')
                    target = factor;
                    braces++
                    break;
            }
            difficulty--;
        }
        expr.push(target)

        while (braces > 0) {
            expr.push(')');
            braces--;
        }
        //============================
        let bool = false, sign1 = null, index, open = false;
        for (let i = 0; i < expr.length; i++) {

            if (!bool && (expr[i] === "+" || expr[i] === "-")) {
                sign1 = expr[i];
                index = i;
                bool = true
            }

            else if (!open && (expr[i] === "(")) {
                open = true;
            }
            else if (open && (expr[i] === "+" || expr[i] === "-")) {
                if (sign1 === expr[i]) {

                    expr[i] = "+"
                    sign1 = expr[i];
                }
                else {
                    expr[i] = "-"
                    sign1 = expr[i];
                }

            }
        }
        //============================
        // console.log("exp.....", expr);
        // return [sign, expr]
        // return (sign == 0) ? expr.join(' ') : ('-(' + expr.join(' ') + ')');
        console.log('expr', expr);

        return expr.join(' ');
    }

    // Modified Code by Rupesh for testing 05-June -2-25 
    // eqGen(target, symb, difficulty) {
    //     let sign = (target < 0) ? -1 : 0;
    //     target = Math.abs(target);
    //     let expr = [];
    //     let symbols = symb;
    //     let factors;
    //     let factor = 1;
    //     let braces = 0;

    //     while (difficulty > 1 && target > 1) {
    //         let op = symbols[Math.floor(Math.random() * symbols.length)];

    //         switch (op) {
    //             case '*':
    //                 factors = this.factorize(target);
    //                 if (factors.length > 0) {
    //                     factor = factors[Math.floor(Math.random() * factors.length)];
    //                 } else {
    //                     // If no factors (prime or 1), fallback to multiplication by 1
    //                     factor = 1;
    //                 }
    //                 expr.push(factor);
    //                 expr.push('*');
    //                 expr.push('(');
    //                 braces++;
    //                 target = target / factor;  // target becomes b in a*b=target
    //                 break;

    //             case '+':
    //                 factor = 1 + Math.floor(Math.random() * (target - 1)); // a random number less than target
    //                 expr.push(factor);
    //                 expr.push('+');
    //                 expr.push('(');
    //                 braces++;
    //                 target = target - factor; // b = target - a
    //                 break;

    //             case '/':
    //                 factors = this.factorize(target);
    //                 if (factors.length > 0) {
    //                     factor = factors[Math.floor(Math.random() * factors.length)];
    //                 } else {
    //                     factor = 1; // fallback factor
    //                 }
    //                 expr.push(target * factor); // a = target * b
    //                 expr.push('/');
    //                 expr.push('(');
    //                 braces++;
    //                 target = factor; // b = factor
    //                 break;

    //             case '-':
    //                 factor = 1 + Math.floor(Math.random() * (target - 1)); // random b less than target
    //                 expr.push(target + factor); // a = target + b
    //                 expr.push('-');
    //                 expr.push('(');
    //                 braces++;
    //                 target = factor; // b = factor
    //                 break;
    //         }
    //         difficulty--;
    //     }

    //     expr.push(target);

    //     while (braces > 0) {
    //         expr.push(')');
    //         braces--;
    //     }

    //     // Fix signs inside parentheses (optional, keep as is or refactor later)
    //     let bool = false, sign1 = null, open = false;
    //     for (let i = 0; i < expr.length; i++) {
    //         if (!bool && (expr[i] === "+" || expr[i] === "-")) {
    //             sign1 = expr[i];
    //             bool = true;
    //         } else if (!open && (expr[i] === "(")) {
    //             open = true;
    //         } else if (open && (expr[i] === "+" || expr[i] === "-")) {
    //             if (sign1 === expr[i]) {
    //                 expr[i] = "+";
    //                 sign1 = expr[i];
    //             } else {
    //                 expr[i] = "-";
    //                 sign1 = expr[i];
    //             }
    //         }
    //     }

    //     // Return expression string with optional minus sign wrapper
    //     return (sign === 0) ? expr.join(' ') : ('-(' + expr.join(' ') + ')');
    // }

};