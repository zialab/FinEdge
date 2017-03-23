import { RateFrequency } from './rate-frequency';
import { CalculationFrequency } from './calculation-frequency';
import { Transaction } from './transaction';



export class PPFCalculator {
    
    rateHistoricalData = {
        "1986" : {"1":12.0,"2":12.0,"3":12.0,"4":12.0,"5":12.0,"6":12.0,"7":12.0,"8":12.0,"9":12.0,"10":12.0,"11":12.0,"12":12.0},
        "1987" : {"1":12.0,"2":12.0,"3":12.0,"4":12.0,"5":12.0,"6":12.0,"7":12.0,"8":12.0,"9":12.0,"10":12.0,"11":12.0,"12":12.0},
        "1988" : {"1":12.0,"2":12.0,"3":12.0,"4":12.0,"5":12.0,"6":12.0,"7":12.0,"8":12.0,"9":12.0,"10":12.0,"11":12.0,"12":12.0},
        "1989" : {"1":12.0,"2":12.0,"3":12.0,"4":12.0,"5":12.0,"6":12.0,"7":12.0,"8":12.0,"9":12.0,"10":12.0,"11":12.0,"12":12.0},
        "1990" : {"1":12.0,"2":12.0,"3":12.0,"4":12.0,"5":12.0,"6":12.0,"7":12.0,"8":12.0,"9":12.0,"10":12.0,"11":12.0,"12":12.0},
        "1991" : {"1":12.0,"2":12.0,"3":12.0,"4":12.0,"5":12.0,"6":12.0,"7":12.0,"8":12.0,"9":12.0,"10":12.0,"11":12.0,"12":12.0},
        "1992" : {"1":12.0,"2":12.0,"3":12.0,"4":12.0,"5":12.0,"6":12.0,"7":12.0,"8":12.0,"9":12.0,"10":12.0,"11":12.0,"12":12.0},
        "1993" : {"1":12.0,"2":12.0,"3":12.0,"4":12.0,"5":12.0,"6":12.0,"7":12.0,"8":12.0,"9":12.0,"10":12.0,"11":12.0,"12":12.0},
        "1904" : {"1":12.0,"2":12.0,"3":12.0,"4":12.0,"5":12.0,"6":12.0,"7":12.0,"8":12.0,"9":12.0,"10":12.0,"11":12.0,"12":12.0},
        "1995" : {"1":12.0,"2":12.0,"3":12.0,"4":12.0,"5":12.0,"6":12.0,"7":12.0,"8":12.0,"9":12.0,"10":12.0,"11":12.0,"12":12.0},
        "1996" : {"1":12.0,"2":12.0,"3":12.0,"4":12.0,"5":12.0,"6":12.0,"7":12.0,"8":12.0,"9":12.0,"10":12.0,"11":12.0,"12":12.0},
        "1997" : {"1":12.0,"2":12.0,"3":12.0,"4":12.0,"5":12.0,"6":12.0,"7":12.0,"8":12.0,"9":12.0,"10":12.0,"11":12.0,"12":12.0},
        "1998" : {"1":12.0,"2":12.0,"3":12.0,"4":12.0,"5":12.0,"6":12.0,"7":12.0,"8":12.0,"9":12.0,"10":12.0,"11":12.0,"12":12.0},
        "1999" : {"1":12.0,"2":12.0,"3":12.0,"4":12.0,"5":12.0,"6":12.0,"7":12.0,"8":12.0,"9":12.0,"10":12.0,"11":12.0,"12":12.0},
        "2000" : {"1":11.0,"2":11.0,"3":11.0,"4":11.0,"5":11.0,"6":11.0,"7":11.0,"8":11.0,"9":11.0,"10":11.0,"11":11.0,"12":11.0},
        "2001" : {"1":11.0,"2":11.0,"3":9.5,"4":9.5,"5":9.5,"6":9.5,"7":9.5,"8":9.5,"9":9.5,"10":9.5,"11":9.5,"12":9.5},
        "2002" : {"1":9.5,"2":9.5,"3":9.0,"4":9.0,"5":9.0,"6":9.0,"7":9.0,"8":9.0,"9":9.0,"10":9.0,"11":9.0,"12":19.0},
        "2003" : {"1":9.0,"2":9.0,"3":8.0,"4":8.0,"5":8.0,"6":8.0,"7":8.0,"8":8.0,"9":8.0,"10":8.0,"11":8.0,"12":8.0},
        "2004" : {"1":8.0,"2":8.0,"3":8.0,"4":8.0,"5":8.0,"6":8.0,"7":8.0,"8":8.0,"9":8.0,"10":8.0,"11":8.0,"12":8.0},
        "2005" : {"1":8.0,"2":8.0,"3":8.0,"4":8.0,"5":8.0,"6":8.0,"7":8.0,"8":8.0,"9":8.0,"10":8.0,"11":8.0,"12":8.0},
        "2006" : {"1":8.0,"2":8.0,"3":8.0,"4":8.0,"5":8.0,"6":8.0,"7":8.0,"8":8.0,"9":8.0,"10":8.0,"11":8.0,"12":8.0},
        "2007" : {"1":8.0,"2":8.0,"3":8.0,"4":8.0,"5":8.0,"6":8.0,"7":8.0,"8":8.0,"9":8.0,"10":8.0,"11":8.0,"12":8.0},
        "2008" : {"1":8.0,"2":8.0,"3":8.0,"4":8.0,"5":8.0,"6":8.0,"7":8.0,"8":8.0,"9":8.0,"10":8.0,"11":8.0,"12":8.0},
        "2009" : {"1":8.0,"2":8.0,"3":8.0,"4":8.0,"5":8.0,"6":8.0,"7":8.0,"8":8.0,"9":8.0,"10":8.0,"11":8.0,"12":8.0},
        "2010" : {"1":8.0,"2":8.0,"3":8.0,"4":8.0,"5":8.0,"6":8.0,"7":8.0,"8":8.0,"9":8.0,"10":8.0,"11":8.0,"12":8.0},
        "2011" : {"1":8.0,"2":8.0,"3":8.0,"4":8.0,"5":8.0,"6":8.0,"7":8.0,"8":8.0,"9":8.0,"10":8.0,"11":8.0,"12":8.6},
        "2012" : {"1":8.6,"2":8.6,"3":8.6,"4":8.8,"5":8.8,"6":8.8,"7":8.8,"8":8.8,"9":8.8,"10":8.8,"11":8.8,"12":8.8},
        "2013" : {"1":8.8,"2":8.8,"3":8.8,"4":8.7,"5":8.7,"6":8.7,"7":8.7,"8":8.7,"9":8.7,"10":8.7,"11":8.7,"12":8.7},
        "2014" : {"1":8.7,"2":8.7,"3":8.7,"4":8.7,"5":8.7,"6":8.7,"7":8.7,"8":8.7,"9":8.7,"10":8.7,"11":8.7,"12":8.7},
        "2015" : {"1":8.7,"2":8.7,"3":8.7,"4":8.7,"5":8.7,"6":8.7,"7":8.7,"8":8.7,"9":8.7,"10":8.7,"11":8.7,"12":8.7},
        "2016" : {"1":8.7,"2":8.7,"3":8.7,"4":8.1,"5":8.1,"6":8.1,"7":8.1,"8":8.1,"9":8.1,"10":8.1,"11":8.1,"12":8.1},
        "2017" : {"1":8.1,"2":8.1,"3":8.1,"4":8.1,"5":8.1,"6":8.1,"7":8.1,"8":8.1,"9":8.1,"10":8.1,"11":8.1,"12":8.1}
    };
    
    investmentAmount : number = 0;
    
    constructor(
        private transaction : Transaction
    ) { }

    calculateMaturityAmount():number{
        let totalInterest = this.calculateReurn();
        return Math.round(Number(this.transaction.amountInvested) +totalInterest*1)/1;
    }
    
    getAmountForMonths(year: number, monthStartIndex: number, monthEndIndex: number) : number{
        let counter : number = monthStartIndex;
        let yearData = this.rateHistoricalData[year];
        let interest : number = 0;
        
        while(counter <= monthEndIndex) {
            
            if(counter < 4) {
                interest = interest + (this.investmentAmount * 1/12 * yearData[counter]/100);
                
            } else if(counter > 4) {
                interest = interest + (this.investmentAmount * 1/12 * yearData[counter]/100);
                
            } else if(counter == 4) {
                this.investmentAmount = this.investmentAmount + interest;
                interest = interest + (this.investmentAmount * 1/12 * yearData[counter]/100);
            }
            counter = counter + 1;
        }
        return interest;
    }
    
    getAmountForYear(year : number) : number{
        let transactionDate: Date = new Date(this.transaction.transactionDate);
        let currentDate: Date = new Date();
        let monthStartIndex = Number('1');
        let monthEndIndex = Number('12');
        let interest : number = 0;
        
//        let prevYearData = this.rateHistoricalData[(year-1)];
//        let yearData = this.rateHistoricalData[year];
//        let nextYearData = this.rateHistoricalData[(year+1)];
        
        if(transactionDate.getFullYear() == year) {
            
            monthStartIndex = transactionDate.getMonth()+1;
            
            if(transactionDate.getDate() > 5) {
                monthStartIndex = monthStartIndex + 1;
            }
            
            interest = interest + this.getAmountForMonths(year, monthStartIndex, monthEndIndex);
            
        } else if(currentDate.getFullYear() == year) { 
            monthEndIndex = currentDate.getMonth() + 1;
            interest = interest + this.getAmountForMonths(year, monthStartIndex, monthEndIndex);
        } else {
            interest = interest + this.getAmountForMonths(year, monthStartIndex, monthEndIndex);
        }
        return Math.round(interest*1)/1;
    }
    
    calculateReurn() : number {
        let transactionDate: Date = new Date(this.transaction.transactionDate);
        let investmentYear : number = transactionDate.getFullYear();
        let currentYear : number = new Date().getFullYear();
        this.investmentAmount = Number(this.transaction.amountInvested);// class variable
        let interest: number = 0;
        let thisYearInterest : number = 0;
        
        while (investmentYear <= currentYear) {
            thisYearInterest = this.getAmountForYear(investmentYear);
            console.log("interest for " + investmentYear +" - "+thisYearInterest);
            interest = interest + thisYearInterest;
            investmentYear = investmentYear + 1;
            thisYearInterest = 0;
        }
        
        console.log("calculateReurn---"+interest);
        
        return interest;
    }

}