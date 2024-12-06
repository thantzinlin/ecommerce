import { Observable, from } from 'rxjs';
import { firstValueFrom, lastValueFrom } from 'rxjs';

// Example 1: Single Value
function testSingleValue(): void {
  console.log('\n--- Single Value Test ---');

  // Promise Example
  const promise: Promise<string> = new Promise((resolve) => {
    console.log('Promise executed');
    setTimeout(() => resolve('Promise resolved!'), 1000);
  });

  promise.then((value) => console.log('Promise:', value));

  // Observable Example
  const observable: Observable<string> = new Observable((subscriber) => {
    console.log('Observable executed');
    setTimeout(() => {
      subscriber.next('Observable emitted!');
      subscriber.complete();
    }, 1000);
  });

  observable.subscribe((value) => console.log('Observable:', value));
}

// Example 2: Multiple Values
function testMultipleValues(): void {
  console.log('\n--- Multiple Values Test ---');

  // Observable Example
  const observable: Observable<number> = new Observable((subscriber) => {
    let count = 0;
    const interval = setInterval(() => {
      subscriber.next(count++);
      if (count > 3) {
        subscriber.complete();
        clearInterval(interval);
      }
    }, 500);
  });

  observable.subscribe({
    next: (value) => console.log('Observable:', value),
    complete: () => console.log('Observable: Completed'),
  });
}

// Example 3: Converting Observable to Promise
function testConvertObservableToPromise(): void {
  console.log('\n--- Convert Observable to Promise ---');

  const observable: Observable<string> = new Observable((subscriber) => {
    subscriber.next('First value');
    subscriber.complete();
  });

  firstValueFrom(observable).then((value) =>
    console.log('FirstValueFrom:', value)
  );

  const observableMulti: Observable<number> = from([10, 20, 30, 40]);

  lastValueFrom(observableMulti).then((value) =>
    console.log('LastValueFrom:', value)
  );
}

// Run Tests
testSingleValue();
setTimeout(() => testMultipleValues(), 2000);
setTimeout(() => testConvertObservableToPromise(), 5000);
