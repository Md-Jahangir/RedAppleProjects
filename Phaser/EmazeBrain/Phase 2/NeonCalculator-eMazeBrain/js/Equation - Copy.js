
export default class Arithmatic{
	constructor(){ 
    }
    isPrime(n){
        let prime = true;
        switch(true){
            case n == 1:
                prime = false;
                break;
            case n<0 :
                prime = undefined;
                break;
            case n>=2:
                for(let i=2;i<=Math.floor(Math.sqrt(n));i++){
                    if(n%i == 0){
                        prime = false;
                        break;
                    }
                }
        }
        return prime;
    }
    factorize(number){
        let factors = [];
        for(let i=2;i<=Math.floor(number/2);i++){
            if(this.isPrime(i) && number%i==0){
                factors.push(i);
            }
        }
        return factors;
    }
    eqGen(target,symb,difficulty){
        let expr = [];
        let symbols = symb;
        let factors;
        let factor = 1;
        let braces = 0;
        while((difficulty)>1 && target>1){
          switch(symbols[Math.floor((Math.random() * (symbols.length)))]){
            case '*':
                  factors = this.factorize(target);
                  
                  if(factors.length>0){
                    factor = factors[Math.floor((Math.random() * (factors.length)))];
                  }
                  expr.push(factor);
                  expr.push('*')
                //   expr.push('')
                  expr.push('(')
                  braces++
                  target /= factor;
                  break;
            case '+':
                  factor = Math.floor(target/2);
                  expr.push(factor);
                  expr.push('+')
                //   expr.push('')
                  expr.push('(')
                  braces++
                  target -= factor;
                  break;
            case '/':
                factors = this.factorize(target);
                    
                if(factors.length>0){
                  factor = factors[Math.floor((Math.random() * (factors.length)))];
                }
                 expr.push(target * factor);
                 expr.push('/')
                //  expr.push('')
                 expr.push('(')
                 target = factor;
                 braces++;
                 break;
            case '-':
                 factor = Math.floor(Math.random() * (Math.floor(target/2) - 3) + 3);
                 expr.push((target + factor));
                 expr.push('-')
                //  expr.push('')
                 expr.push('(')
                 target = factor;
                 braces++
                 break;
          }
          difficulty--;
        }
        expr.push(target)
        while(braces>0){
            // expr.push('')
          expr.push(')');
          braces--;
        }
        return expr.join(' ');
      }
};