<template>
  <div class="calculator">
    <DisplayCalculator :value="displayValue" />
    <ButtonCalculator label="AC" triple @onClick="clearMemory"/>
    <ButtonCalculator label="/" operation @onClick="setOperation" />
    <ButtonCalculator label="7"  @onClick="addDigit"/>
    <ButtonCalculator label="8" @onClick="addDigit" />
    <ButtonCalculator label="9" @onClick="addDigit" />
    <ButtonCalculator label="*" operation @onClick="setOperation"/>
    <ButtonCalculator label="4" @onClick="addDigit" />
    <ButtonCalculator label="5" @onClick="addDigit" />
    <ButtonCalculator label="6" @onClick="addDigit" />
    <ButtonCalculator label="-" operation @onClick="setOperation"/>
    <ButtonCalculator label="1" @onClick="addDigit" />
    <ButtonCalculator label="2" @onClick="addDigit" />
    <ButtonCalculator label="3" @onClick="addDigit" />
    <ButtonCalculator label="+" operation @onClick="setOperation"/>
    <ButtonCalculator label="0" double @onClick="addDigit"/>
    <ButtonCalculator label="." @onClick="addDigit" />
    <ButtonCalculator label="=" operation @onClick="setOperation"/>
  </div>
</template>


<script>


import ButtonCalculator from '../components/ButtonCalculator.vue'
import DisplayCalculator from '../components/DisplayCalculator.vue'

export default {
  data : function(){
    return {
      displayValue:"0",
      clearDisplay: false,
      operation: null,
      values: [0,0],
      current: 0
        }
  },
    components: {ButtonCalculator,DisplayCalculator},
    methods:{
      clearMemory(){
        Object.assign(this.$data, this.$options.data())
      },
      setOperation(operation){
        if(this.current === 0){
          this.operation = operation
          this.current = 1
          this.clearDisplay = true
        }else {
          const equals = operation === "="
          const currentOperation = this.operation 
         try {
          this.values[0] = eval (
            ` ${this.values[0]} ${currentOperation} ${this.values[1]}`
          ) 
          if (isNaN(this.values[0]) || !isFinite(this.values[0])) {
	this.clearMemory()
return
}
        }catch(e){
          this.$emit('onError',e)
        }
        this.values[1] =0
        this.displayValue = this.values[0]
        this.current = equals ? 0 : 1
        this.clearDisplay = !equals
      }
      },





      addDigit(n){
        if(n === "." && this.displayValue.includes(".")){
          return
        }
        const clearDisplay = this.displayValue === "0" || this.clearDisplay

        const curretValue = clearDisplay ? "" : this.displayValue
        const  displayValue =  curretValue + n


        this.displayValue = displayValue
        this.clearDisplay = false
        this.values[this.current] = displayValue


        
      }
    }
}

</script>
<style>
.calculator {
    height: 320px;
    width: 235px;
    border-radius:  5px;
    overflow: hidden;


    display: grid;
    grid-template-columns: repeat(4, 25%);
    grid-template-rows: 1fr 48px 48px 48px 48px 48px;

}


</style>