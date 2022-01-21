import { Vector } from './vector';

describe('Vector', ()=>{
    it('should create', ()=>{
        new Vector();
        new Vector<string>();
    });

    it('should add item and return correct size', ()=>{
        const v = new Vector<string>();
        v.add('hello');

        expect(v.size()).toEqual(1);
        expect(v.get(0)).toEqual('hello');
    });

    it('should add item and place it at the end', ()=>{
        const v = new Vector<string>();
        v.add('hello');
        v.add('world');

        expect(v.size()).toEqual(2);
        expect(v.get(1)).toEqual('world');
    });

    it('should implement iterator', ()=>{
        const v = new Vector<string>();
        expect(v.iterator()).toBeDefined();
    });

    it('should support iteration of its list value', ()=>{
        const expectedV1 = 123
        const expectedV2 = 456;

        const v = new Vector<number>();
        v.add(expectedV1);
        v.add(expectedV2);

        const it = v.iterator();
        let count = 0;
        let sum = 0;

        while(it.hasNext()) {
            sum += it.next();
            count++;
        }

        expect(count).toEqual(2);
        expect(sum).toEqual(expectedV1 + expectedV2);
    });

    it("isEmpty should return true when vector is empty", ()=>{
        const v = new Vector<number>();

        expect(v.isEmpty()).toBeTruthy();
    });

    it("isEmpty should return false when vector is not empty", ()=>{
        const v = new Vector<number>();
        v.add(1);

        expect(v.isEmpty()).toBeFalsy();
    });
});